from rest_framework import routers
from home.views import NewsViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('news', NewsViewSet, basename="news")

urlpatterns = [
    path('', include(router.urls)),
]
