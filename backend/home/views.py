from rest_framework.decorators import action
from datetime import date, datetime
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .utils import news
from accounts.permissions import IsHR, IsEmployee
from .models import Leave, Attendance, Insurance, Bonus, Reimbursement, LeaveBalance, Holiday
from .serializers import LeaveSerializer, AttendanceSerializer, InsuranceSerializer, BonusSerializer, ReimbursementSerializer, HolidaySerializer, EmployeeSerializer, HRSerializer
from accounts.models import Employee

class NewsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response(news, status=200)

class AddLeaveViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsHR]
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveSerializer

    @action(detail=False, methods=['post'])
    def add_monthly_leaves(self, request):
        leave_data = request.data.get('leaves')

        if not leave_data or not isinstance(leave_data, list):
            return Response(
                {"error": "'leaves' field must be a list of objects with 'employee' and 'leave_type'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        for leave_entry in leave_data:
            employee_id = leave_entry.get('employee')
            leave_type = leave_entry.get('leave_type')
            leave_increment = leave_entry.get('count')

            if not all([employee_id, leave_type, leave_increment]):
                return Response(
                    {"error": "Each leave entry must have 'employee', 'leave_type', and 'count'."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                leave_increment = int(leave_increment)
            except ValueError:
                return Response(
                    {"error": "'count' must be an integer."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            leave_balance, created = LeaveBalance.objects.get_or_create(
                employee_id=employee_id,
                leave_type=leave_type,
                defaults={'total_leaves': leave_increment}
            )
            if not created:
                leave_balance.total_leaves += leave_increment
                leave_balance.save()

        return Response(
            {"message": "Leave balances updated successfully."},
            status=status.HTTP_200_OK
        )

class LeaveViewSet(viewsets.ModelViewSet):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Filter leaves for the logged-in employee
    def get_queryset(self):
        return self.queryset.filter(employee=self.request.user)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        user = request.user
        today = date.today()

        # Ensure only one check-in per day
        attendance, created = Attendance.objects.get_or_create(user=user, date=today, defaults={"status": "Present"})
        if attendance.check_in_time:
            return Response({"message": "Already checked in!"}, status=status.HTTP_400_BAD_REQUEST)
        
        attendance.check_in_time = datetime.now().time()
        attendance.calculate_late()
        attendance.save()
        return Response({"message": "Checked in successfully!", "data": AttendanceSerializer(attendance).data})

    @action(detail=False, methods=['post'])
    def check_out(self, request):
        user = request.user
        today = date.today()

        try:
            attendance = Attendance.objects.get(user=user, date=today)
        except Attendance.DoesNotExist:
            return Response({"message": "No check-in found for today!"}, status=status.HTTP_400_BAD_REQUEST)
        
        if attendance.check_out_time:
            return Response({"message": "Already checked out!"}, status=status.HTTP_400_BAD_REQUEST)
        
        attendance.check_out_time = datetime.now().time()
        attendance.save()
        return Response({"message": "Checked out successfully!", "data": AttendanceSerializer(attendance).data})


    @action(detail=False, methods=['get'])
    def monthly_summary(self, request):
        user = request.user
        month = request.query_params.get('month', datetime.now().month)
        year = request.query_params.get('year', datetime.now().year)

        attendance = Attendance.objects.filter(user=user, date__year=year, date__month=month)
        present_days = attendance.filter(status="Present").count()
        absent_days = attendance.filter(status="Absent").count()
        late_days = attendance.filter(late=True).count()

        summary = {
            "month": month,
            "year": year,
            "days_present": present_days,
            "days_absent": absent_days,
            "days_late": late_days,
        }
        return Response(summary)

class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class BonusViewSet(viewsets.ModelViewSet):
    queryset = Bonus.objects.all()
    serializer_class = BonusSerializer

class ReimbursementViewSet(viewsets.ModelViewSet):
    queryset = Reimbursement.objects.all()
    serializer_class = ReimbursementSerializer

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
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        try:
            hr = request.user.hr
            serializer = HRSerializer(hr)
            return Response(serializer.data, status=200)
        except Employee.DoesNotExist:
            return Response({"error": "Employee details not found"}, status=404)