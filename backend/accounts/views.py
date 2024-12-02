
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import AdminUser, Employee, User
from .serializers import AdminUserSerializer, EmployeeSerializer, AdminLoginSerializer, AdminUserOTPSendSerializer, UserSerializer, AdminUserOTPVerifySerializer, UserOTPVerifySerializer, UserOTPVerifySerializer, UserOTPSendSerializer

from .permissions import IsEmployee, IsManager, IsHR, IsAdmin

class AdminUserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Overrides global IsAuthenticated

    def list(self, request):
        for key in list(request.session.keys()):
            del request.session[key]
        return Response({"message": "logout successfully"}, status=200)

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
    
            try:
                user = AdminUser.objects.get(email=email)
                print(user,"user")
            except:
                return Response({"message": "User not found"}, status=404)

            if not check_password(password, user.password):
                raise AuthenticationFailed("Invalid password")

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username':user.email,
                'message': "Login successful!"
            }, status=200)

        return Response(serializer.errors, status=400)


class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsHR]
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser) 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['firstname', 'lastname','department', 'designation', 'gender']


class AdminViewSet(viewsets.ModelViewSet):
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer

    @action(detail=False, methods=['post'], url_path='send-otp')
    def send_otp(self, request):
        serializer = AdminUserOTPSendSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            admin, _ = AdminUser.objects.get_or_create(email=email)
            admin.generate_otp() 
            admin.save()

            # Send OTP via email
            send_mail(
                'Your OTP for Admin Registration',
                f'Your OTP is {admin.otp}',
                'from@example.com',  # Replace with your email
                [email],
                fail_silently=False,
            )
            return Response({'message': 'OTP sent to email.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='verify-otp')
    def verify_otp(self, request):
        serializer = AdminUserOTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            admin_user = serializer.save()

            # Now that OTP is verified, we set the password if it's provided in the request
            password = request.data.get('password')
            if password:
                admin_user.password = password
                admin_user.save()

            return Response({'message': 'OTP verified and password set successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    permission_classes = [IsAdmin]

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
                'sovianthwal@gmail.com',  # Your email
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

class Hello(APIView):
    permission_classes = [IsAuthenticated, IsEmployee] 
    def get(self, request):
        return Response({'text':"hello employee"}, status=200)

class HelloManager(APIView):
    permission_classes = [IsAuthenticated, IsManager] 
    def get(self, request):
        return Response({'text':"hello Manager"}, status=200)

class HelloHR(APIView):
    permission_classes = [IsAuthenticated, IsHR] 
    def get(self, request):
        return Response({'text':"hello HR"}, status=200)


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

