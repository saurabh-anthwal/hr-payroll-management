from rest_framework import serializers
from .models import AdminUser, Employee, User
from django.contrib.auth.hashers import make_password


class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50, style={'input_type': 'password'})


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        if username == "" and password == "":
            raise serializers.ValidationError("field not be null!")
        password = make_password(validated_data.pop('password'))
        admin = AdminUser.objects.create(password=password, **validated_data)
        admin.save()
        return admin

    def update(self, instance, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        status = validated_data.get('status')
        admin = AdminUser.objects.get(id=instance.id)

        if password not in [None, ""]:
            admin.password = make_password(password)
        if username not in [None, ""]:
            admin.username = username
        if status not in [None, ""]:
            admin.status = status

        admin.save()
        return admin


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'type','password'] 
    
        def create(self, validated_data):
            password = validated_data.pop('password')
            user = User(**validated_data)
            user.set_password(password)
            user.save()
            return user

        def update(self, instance, validated_data):
            password = validated_data.pop('password', None)
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            if password:
                instance.set_password(password)
            instance.save()
            return instance
