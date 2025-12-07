from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views # Import our views.py

# Import the JWT views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# This is the "magic" DRF router
router = DefaultRouter()

# We "register" our ViewSets with the router
# This tells the router: "Use 'jobs' as the URL prefix for the JobViewSet"
router.register(r'jobs', views.JobViewSet, basename='job')
router.register(r'applications', views.ApplicationViewSet, basename='application')
router.register(r'users', views.UserViewSet, basename='user')

# The router generates the URL patterns.
# We just need to include them in Django's urlpatterns.
urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # This allows you to refresh a token (advanced, but good to have)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]