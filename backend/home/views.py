from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from datetime import datetime
from .utils import news
from .models import Insurance, Bonus, Holiday, LeaveBalance,Leave
from .serializers import LeaveBalanceSerializer,LeaveSerializer, InsuranceSerializer, BonusSerializer, HolidaySerializer, EmployeeSerializer, HRSerializer
from accounts.models import Employee, HR
from accounts.permissions import IsHR

class LeaveBalanceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveBalanceSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return LeaveBalance.objects.all()
        return LeaveBalance.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"error": "Only HR can create leave balances."}, status=403)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"error": "Only HR can update leave balances."}, status=403)
        return super().update(request, *args, **kwargs)

class LeaveViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer

    def get_queryset(self):
        # Employees see only their own leave applications
        return Leave.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        leave_type = request.data.get('leave_type')
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        # Calculate leave duration
        try:
            leave_days = (datetime.strptime(end_date, '%Y-%m-%d') - datetime.strptime(start_date, '%Y-%m-%d')).days + 1
        except Exception as e:
            return Response({"error": "Invalid dates provided."}, status=400)

        leave_balance = LeaveBalance.objects.filter(user=user, leave_type=leave_type).first()
        if not leave_balance:
            return Response({"error": f"No leave balance found for leave type: {leave_type}"}, status=400)

        if leave_balance.remaining_leaves() < leave_days:
            return Response({"error": "Insufficient leave balance."}, status=400)

        leave_balance.used_leaves += leave_days
        leave_balance.save()

        return super().create(request, *args, **kwargs)

class NewsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response(news, status=200)

class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class BonusViewSet(viewsets.ModelViewSet):
    queryset = Bonus.objects.all()
    serializer_class = BonusSerializer

class HolidayViewSet(viewsets.ModelViewSet):
    queryset = Holiday.objects.all()
    serializer_class = HolidaySerializer

class GetLoggedInEmployeeDetail(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        try:
            # Fetch the Employee object associated with the logged-in user
            employee = request.user.employee
            # Serialize the employee details and return as a response
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data, status=200)
        except Employee.DoesNotExist:
            return Response({"error": "Employee details not found"}, status=404)

class GetLoggedInHRDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            hr = request.user.hr
            serializer = HRSerializer(hr, context={'request': request})  # Pass request to context
            return Response(serializer.data, status=200)
        except HR.DoesNotExist:  # Changed to HR.DoesNotExist (assuming typo in your original code)
            return Response({"error": "HR details not found"}, status=404)

