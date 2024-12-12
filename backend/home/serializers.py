from rest_framework import serializers
from .models import Insurance, Bonus, Holiday
from accounts.models import Employee, HR
from .models import LeaveBalance, Leave

class LeaveBalanceSerializer(serializers.ModelSerializer):
    remaining_leaves = serializers.ReadOnlyField()

    class Meta:
        model = LeaveBalance
        fields = '__all__'

class LeaveSerializer(serializers.ModelSerializer):
    remaining_leave = serializers.ReadOnlyField()

    class Meta:
        model = Leave
        fields = '__all__'


class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'

class BonusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bonus
        fields = '__all__'

class HolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Holiday
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'firstname', 'lastname', 'email', 'contact', 'gender', 'dob', 'address', 
                  'department', 'designation', 'dateOfHired', 'dateOfJoined', 'profilePic', 'active']

class HRSerializer(serializers.ModelSerializer):
    profilePic = serializers.SerializerMethodField()

    class Meta:
        model = HR
        fields = '__all__'

    def get_profilePic(self, obj):
        request = self.context.get('request')
        if obj.profilePic and request:
            return request.build_absolute_uri(obj.profilePic.url)
        return None


