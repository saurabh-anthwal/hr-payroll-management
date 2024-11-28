
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

from .models import AdminUser, Employee, User
from .serializers import AdminUserSerializer, EmployeeSerializer, AdminLoginSerializer, EmployeeLoginSerializer, UserSerializer

from .permissions import IsAdmin

class AdminUserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Overrides global IsAuthenticated

    def list(self, request):
        for key in list(request.session.keys()):
            del request.session[key]
        return Response({"message": "logout successfully"}, status=200)

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
    
            try:
                user = AdminUser.objects.get(username=username)
                print(user,"user")
            except:
                return Response({"message": "User not found"}, status=404)

            if not check_password(password, user.password):
                raise AuthenticationFailed("Invalid password")

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username':user.username,
                'message': "Login successful!"
            }, status=200)

        return Response(serializer.errors, status=400)


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    # parser_classes = (MultiPartParser, FormParser,)
    serializer_class = EmployeeSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser) 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['firstname', 'lastname','department', 'designation', 'gender']
    permission_classes = [IsAuthenticated]  # Restrict access


class AdminViewSet(viewsets.ModelViewSet):
    queryset = AdminUser.objects.all()
    serializer_class = AdminUserSerializer


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
    permission_classes = [IsAuthenticated]

    #response password remove
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        self.perform_create(serializer)
        
        response_data = serializer.data
        response_data.pop('password',None)

        return Response(response_data,status=201)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            raise AuthenticationFailed("Email and password are required.")

        # Get the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid email or password.")

        # Check the password
        if not check_password(password, user.password):
            raise AuthenticationFailed("Invalid email or password.")

        # Create a refresh token and access token for the user
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token) 
        user_data = UserSerializer(user).data

        return Response({
            'access_token': access_token,
            'refresh_token': str(refresh),
            'user_id': user.id,
            'email': user.email,
            'type': getattr(user, 'type', 'N/A'),
        }, status=200)

class Hello(APIView):
    permission_classes = [IsAuthenticated, IsAdmin] 
    def get(self, request):
        return Response({'text':"hello word"}, status=200)