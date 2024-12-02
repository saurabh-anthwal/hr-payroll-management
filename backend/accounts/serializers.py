from rest_framework import serializers
import random
from .models import AdminUser, Employee, User
from django.contrib.auth.hashers import make_password


class AdminLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50, style={'input_type': 'password'})

# Serializer for sending OTP
class AdminUserOTPSendSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, email):
        # Create user if email does not exist
        admin_user, created = AdminUser.objects.get_or_create(email=email)
        return email

# Serializer for verifying OTP
class AdminUserOTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, required=True)
    password = serializers.CharField(max_length=128, required=True)

    serializers.CharField(max_length=128, required=True)
    def validate(self, data):
        email = data['email']
        otp = data['otp']

        try:
            admin_user = AdminUser.objects.get(email=email)

            if admin_user.otp != otp:
                raise serializers.ValidationError({'otp': 'Invalid OTP.'})
            
            if admin_user.otp_verified:
                raise serializers.ValidationError({'otp': 'OTP has already been verified.'})
            
            data['admin_user'] = admin_user
            return data

        except AdminUser.DoesNotExist:
            raise serializers.ValidationError({'email': 'Email not found.'})

    def save(self):
        
        email = self.validated_data['email']
        admin_user = AdminUser.objects.get(email=email)
        admin_user.otp_verified = True
        password = self.validated_data['password']
        admin_user.password = make_password(password)  # Hashing the password
        admin_user.save()
        return admin_user

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['email', 'password', 'status', 'otp', 'otp_verified']
        extra_kwargs = {
            'password': {'write_only': True},
            'otp': {'read_only': True},
        }

    def validate(self, data):
        email = data.get('email')
        if AdminUser.objects.filter(email=email, otp_verified=True).exists():
            raise serializers.ValidationError("Email is already registered.")
        return data

    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')

        if not email or not password:
            raise serializers.ValidationError("Email and password fields cannot be null.")
        
        try:
            # Check if user already exists (without verifying OTP)
            admin_user, created = AdminUser.objects.get_or_create(email=email)

            # If user already exists, reset OTP verification and update status
            if not created:
                admin_user.otp_verified = False  # Reset OTP verification status
                admin_user.status = validated_data.get('status', admin_user.status)
            
            # Hash the password before saving
            admin_user.password = make_password(password)
            admin_user.save()

            # Generate OTP (can be done for both new and existing users)
            admin_user.otp = str(random.randint(100000, 999999))  # Random OTP
            admin_user.save()

        except Exception as e:
            raise serializers.ValidationError(f"Error creating admin user: {str(e)}")

        return admin_user

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        status = validated_data.get('status')

        if password:
            instance.password = make_password(password)
        if status is not None:
            instance.status = status

        instance.save()
        return instance

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserOTPSendSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(max_length=128)
    type = serializers.ChoiceField(choices=User.Types.choices)

    def validate_email(self, value):
        # Add custom validation for email if needed
        return value

from rest_framework import serializers
from .models import User

class UserOTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    password = serializers.CharField(max_length=128)

    def validate(self, data):
        email = data['email']
        otp = data['otp']

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'email': 'Email not found.'})

        if user.otp != otp:
            raise serializers.ValidationError({'otp': 'Invalid OTP.'})

        if user.otp_verified:
            raise serializers.ValidationError({'otp': 'OTP has already been verified.'})

        data['user'] = user
        return data

    def save(self):
        user = self.validated_data['user']
        user.otp_verified = True
        password = self.validated_data.get('password')
        if password:
            user.set_password(password)  # Hash and save the password
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'type', 'password', 'otp_verified']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.otp_verified = False 
        user.generate_otp()
        user.save()

        return user