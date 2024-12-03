from rest_framework import routers
from home.views import NewsViewSet
from django.urls import path, include
from home.views import LeaveViewSet, AttendanceViewSet, InsuranceViewSet, BonusViewSet, ReimbursementViewSet, AddLeaveViewSet, HolidayViewSet,GetLoggedInEmployeeDetail, GetLoggedInHRDetail

router = routers.DefaultRouter()
router.register('news', NewsViewSet, basename="news")
router.register('leaves/add_monthly_leaves/', AddLeaveViewSet, basename="monthly-leave")
router.register('leaves', LeaveViewSet, basename="leave")
router.register('attendance', AttendanceViewSet, basename="attendance")
router.register('insurance', InsuranceViewSet, basename="insurance")
router.register('bonus', BonusViewSet, basename="bonus")
router.register('reimbursements', ReimbursementViewSet, basename="reimbursements")
router.register('holidays', HolidayViewSet, basename='holiday')


urlpatterns = [
    path('', include(router.urls)),
    path('employee/details/', GetLoggedInEmployeeDetail.as_view(), name='logged-in-employee-detail'),
    path('hr/details/', GetLoggedInHRDetail.as_view(), name='logged-in-hr-detail'),
]

