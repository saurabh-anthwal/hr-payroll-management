from rest_framework import routers
from salary.views import SalaryViewSet, MonthlySalaryViewSet, GetEmpSalaryDetails
from django.urls import path, include

router = routers.DefaultRouter()
router.register('salary', SalaryViewSet, basename='salary')
router.register('monthly-salary', MonthlySalaryViewSet, basename='monthlySalary')

urlpatterns = [
    path('', include(router.urls)),
    path('employee/salary-details/',GetEmpSalaryDetails.as_view(), name='salary-detail' )
]
