
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.core.mail import send_mail
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Admin, Employee, User, HR, Manager
from .serializers import EmployeeSerializer, AdminSerializer, UserOTPVerifySerializer, UserOTPVerifySerializer, UserOTPSendSerializer, HRSerializer, ManagerSerializer, UserSerializer
from .permissions import IsHR, IsAdmin

class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsHR]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser) 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['firstname', 'lastname','department', 'designation', 'gender']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class HRViewSet(viewsets.ModelViewSet):
    queryset = HR.objects.all()
    serializer_class = HRSerializer

class ManagerViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer

class CountEmployee(viewsets.ViewSet):
    permission_classes = [AllowAny]  
    def list(self, request):
        # abc = request.user
        # breakpoint()
        total = Employee.objects.count()
        active = Employee.objects.filter(active=True).count()
        inactive = Employee.objects.filter(active=False).count()
        
        return Response({
            'total_employees': total,
            'active_employees': active,
            'inactive_employees': inactive,
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsHR]

    @action(detail=False, methods=['post'], url_path='send-otp')
    def send_otp(self, request):
        serializer = UserOTPSendSerializer(data=request.data)
        if serializer.is_valid():
            # Extract email, username, password, and type from the payload
            email = serializer.validated_data['email']
            username = serializer.validated_data['username']
            user_type = serializer.validated_data['type']

            # Check if the user already exists; create if not
            user, created = User.objects.get_or_create(email=email)

            if created:
                user.username = username
                user.type = user_type
                user.otp_verified = False  # OTP not verified yet
                user.generate_otp()  # Generate OTP
                user.save()

            # Send OTP to the email
            send_mail(
                'Your OTP for Admin Registration',
                f'Your OTP is {user.otp}',
                email, 
                [email],
                fail_silently=False,
            )

            # Prepare the user data response (without password)
            user_data = {
                'email': user.email,
                'username': user.username,
                'type': user.type,
                'otp_verified': user.otp_verified
            }

            return Response(
                {
                    'message': 'OTP sent to email.',
                    'user': user_data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='verify-otp')
    def verify_otp(self, request):
        serializer = UserOTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            # OTP is verified, save the password if provided
            user = serializer.save()
            password = serializer.validated_data.get('password')
            if password:
                user.set_password(password)  # Hash and save the password
            user.save()

            return Response({'message': 'OTP verified and password set successfully.'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            raise AuthenticationFailed("Email and password are required.")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid email or password.")

        if not check_password(password, user.password):
            raise AuthenticationFailed("Invalid email or password.")

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token) 

        return Response({
            'access_token': access_token,
            'refresh_token': str(refresh),
            'user_id': user.id,
            'email': user.email,
            'type': getattr(user, 'type', 'N/A'),
        }, status=200)

class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise NotFound("User with this email does not exist.")

        # Generate OTP and save it
        user.generate_otp()

        # Send OTP via email
        send_mail(
            subject="Password Reset OTP",
            message=f"Your OTP for password reset is {user.otp}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

        return Response({"message": "OTP sent to your email."}, status=200)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not email or not otp or not new_password:
            raise ValidationError("Email, OTP, and new password are required.")

        # Validate OTP
        try:
            user = User.objects.get(email=email, otp=otp)
        except User.DoesNotExist:
            raise ValidationError("Invalid OTP or email.")

        # Reset password
        user.set_password(new_password)
        user.otp = None  # Clear OTP after use
        user.save()

        return Response({"message": "Password has been reset successfully."}, status=200)


class AllUsersViewSet(viewsets.ViewSet, ListModelMixin):
    def list(self, request):
        employees = Employee.objects.all()
        admins = Admin.objects.all()
        hrs = HR.objects.all()
        managers = Manager.objects.all()

        employee_data = EmployeeSerializer(employees, many=True).data
        admin_data = AdminSerializer(admins, many=True).data
        hr_data = HRSerializer(hrs, many=True).data
        manager_data = ManagerSerializer(managers, many=True).data

        combined_data = employee_data + admin_data + hr_data + manager_data

        return Response(combined_data)