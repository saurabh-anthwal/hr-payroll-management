from rest_framework import serializers
from .models import Salary, MonthlySalary, Employee, User
from accounts.models import Manager

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'

class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'


class MonthlySalarySerializer(serializers.ModelSerializer):
    employee = serializers.SerializerMethodField()
    manager = serializers.SerializerMethodField() 
    salary = SalarySerializer(read_only=True)
    user = UserSerializer(read_only=True)   

    def get_employee(self, obj):
        if hasattr(obj.user, 'employee') and obj.user.employee:
            return EmployeeSerializer(obj.user.employee).data
        return None

    def get_manager(self, obj):
        if hasattr(obj.user, 'manager') and obj.user.manager:
            return ManagerSerializer(obj.user.manager).data
        return None

    class Meta:
        model = MonthlySalary
        fields = '__all__'

class GetEmpSalaryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

class MonthlySalaryInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlySalary
        fields = [
            "user",
            "salary",
            "from_date",
            "to_date",
            "total_salary",
            "paid_amount",
            "balance_amount",
            "paid_status",
            "paid_date",
            "payment_due_date"
        ]
