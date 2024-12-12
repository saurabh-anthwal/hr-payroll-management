from rest_framework import routers
from home.views import NewsViewSet
from django.urls import path, include
from home.views import LeaveBalanceViewSet,LeaveViewSet, InsuranceViewSet, BonusViewSet, HolidayViewSet,GetLoggedInEmployeeDetail, GetLoggedInHRDetail

router = routers.DefaultRouter()
router.register('news', NewsViewSet, basename="news")
router.register('insurance', InsuranceViewSet, basename="insurance")
router.register('bonus', BonusViewSet, basename="bonus")
router.register('holidays', HolidayViewSet, basename='holiday')
router.register('leave-balances', LeaveBalanceViewSet, basename='leave-balances')
router.register('leaves', LeaveViewSet, basename='leaves')


urlpatterns = [
    path('', include(router.urls)),
    path('employee/details/', GetLoggedInEmployeeDetail.as_view(), name='logged-in-employee-detail'),
    path('hr/details/', GetLoggedInHRDetail.as_view(), name='logged-in-hr-detail'),
]

