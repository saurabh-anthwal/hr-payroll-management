from rest_framework import routers
from django.urls import path, include
from .views import AdminUserViewSet, AdminViewSet, EmployeeViewSet, CountEmployee, UserViewSet, LoginView, Hello
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('admin-login', AdminUserViewSet, basename='adminLogin')
router.register('admin', AdminViewSet, basename='admin')
router.register('employee', EmployeeViewSet, basename='employee')
router.register('employee-count', CountEmployee, basename='employeeCount')
router.register('users', UserViewSet, basename='users')


urlpatterns = [
    path('', include(router.urls)),  # Register all routes
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('helo/', Hello.as_view(), name='hello'),
]
