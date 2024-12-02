from rest_framework import routers
from django.urls import path, include
from .views import AdminViewSet, EmployeeViewSet, CountEmployee, UserViewSet, LoginView, ForgotPasswordView, ResetPasswordView, HRViewSet, ManagerViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('admin', AdminViewSet, basename='admin')
router.register('users', UserViewSet, basename='users')
router.register('employee', EmployeeViewSet, basename='employee')
router.register('employee-count', CountEmployee, basename='employeeCount')
router.register('hrs', HRViewSet, basename='hr')
router.register('managers', ManagerViewSet, basename='manager')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('hr/', include(router.urls)),
    path('manager/', include(router.urls)),
]
