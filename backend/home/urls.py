from rest_framework import routers
from home.views import NewsViewSet
from django.urls import path, include
from home.views import LeaveViewSet, AttendanceViewSet, InsuranceViewSet, BonusViewSet, ReimbursementViewSet

router = routers.DefaultRouter()
router.register('news', NewsViewSet, basename="news")
# router.register('leaves/add_monthly_leaves/', AddLeaveViewSet, basename="monthly-leave")
router.register('leaves', LeaveViewSet, basename="leave")
router.register('attendance', AttendanceViewSet, basename="attendance")
router.register('insurance', InsuranceViewSet, basename="insurance")
router.register('bonus', BonusViewSet, basename="bonus")
router.register('reimbursements', ReimbursementViewSet, basename="reimbursements")


urlpatterns = [
    path('', include(router.urls)),
]

