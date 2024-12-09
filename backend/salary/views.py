from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.exceptions import NotFound
from .models import Salary
from .serializers import SalarySerializer, GetEmpSalaryDetailSerializer
from accounts.models import Employee
from .models import MonthlySalary, Salary
from accounts.permissions import IsHR, IsEmployee

class SalaryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsHR]
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['employee_id']


class MonthlySalaryViewSet(viewsets.ViewSet):
    permission_classes = [IsHR]
    def list(self, request):
        paid_status = request.GET.get('paidStatus', None)
        full_name = request.GET.get('fullName', None)
        department = request.GET.get('department', None)

        # Using Django ORM instead of raw SQL queries
        queryset = MonthlySalary.objects.all().select_related('employee')

        if full_name:
            queryset = queryset.filter(employee__first_name__icontains=full_name)
        
        if department:
            queryset = queryset.filter(employee__department__icontains=department)

        if paid_status is not None:
            queryset = queryset.filter(paid_status=paid_status)

        data = []
        for monthly_salary in queryset:
            # Assuming you need some details from related models (Employee and Salary)
            employee = monthly_salary.employee
            salary = Salary.objects.filter(employee=employee).first()  # Assuming 1 salary per employee
            data.append({
                'emp_id': employee.id,
                'full_name': f"{employee.firstname} {employee.lastname}",
                'department': employee.department,
                'salary': salary.monthly_salary if salary else None,
                'from_date': monthly_salary.from_date,
                'to_date': monthly_salary.to_date,
                'paid_status': monthly_salary.paid_status,
                'paid_date': monthly_salary.paid_date,
            })

        return Response(data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            monthly_salary = MonthlySalary.objects.get(pk=pk)
            employee = monthly_salary.employee
            salary = Salary.objects.filter(employee=employee).first()  # Assuming 1 salary per employee

            data = {
                'emp_id': employee.id,
                'full_name': f"{employee.first_name} {employee.last_name}",
                'department': employee.department,
                'salary': salary.monthly_salary if salary else None,
                'from_date': monthly_salary.from_date,
                'to_date': monthly_salary.to_date,
                'paid_status': monthly_salary.paid_status,
                'paid_date': monthly_salary.paid_date,
            }

            return Response(data, status=status.HTTP_200_OK)

        except MonthlySalary.DoesNotExist:
            return Response({'message': 'not found!'}, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        try:
            monthly_salary = MonthlySalary.objects.get(pk=pk)
            paid_status = request.data.get('paidStatus')
            paid_date = request.data.get('paidDate')

            monthly_salary.paid_status = paid_status
            monthly_salary.paid_date = paid_date
            monthly_salary.save()

            return Response({'message': 'row updated!'}, status=status.HTTP_200_OK)

        except MonthlySalary.DoesNotExist:
            return Response({'message': 'not found!'}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        # Extract data from request body
        employee_id = request.data.get('employee_id')
        from_date = request.data.get('from_date')
        to_date = request.data.get('to_date')
        paid_status = request.data.get('paid_status', False)
        paid_date = request.data.get('paid_date', None)

        try:
            # Fetch employee using the provided employee_id
            employee = Employee.objects.get(user_id=employee_id)
        except Employee.DoesNotExist:
            return Response({'message': 'Employee not found'}, status=status.HTTP_400_BAD_REQUEST)

        # Create new MonthlySalary object
        monthly_salary = MonthlySalary.objects.create(
            employee=employee,
            from_date=from_date,
            to_date=to_date,
            paid_status=paid_status,
            paid_date=paid_date
        )

        # Return response with newly created MonthlySalary data
        return Response({
            'emp_id': employee.id,
            # 'full_name': f"{employee.first_name} {employee.last_name}",
            'department': employee.department,
            'from_date': monthly_salary.from_date,
            'to_date': monthly_salary.to_date,
            'paid_status': monthly_salary.paid_status,
            'paid_date': monthly_salary.paid_date,
        }, status=status.HTTP_201_CREATED)

class GetEmpSalaryDetails(APIView):
    permission_classes = [IsEmployee]

    def get(self, request):
        try:
            # Get the employee object related to the logged-in user
            employee = request.user.employee
            
            # Fetch the salary details for this employee
            salary = Salary.objects.filter(employee=employee).first()
            
            if not salary:
                raise NotFound("Salary details not found for this employee")
            
            # Serialize the salary data
            serializer = GetEmpSalaryDetailSerializer(salary)
            return Response(serializer.data, status=200)
        except NotFound as e:
            return Response({"error": str(e)}, status=404)
        except Exception as e:
            return Response({"error": "An unexpected error occurred"}, status=500)
