from rest_framework import viewsets
from .models import User, Job, Application
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # We'll use these soon
from rest_framework import viewsets, filters # <-- Add 'filters'
# ... other imports
import django_filters

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_approved=True)
    serializer_class = JobSerializer

    # --- Add these lines ---
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend, # For exact matches (location)
        filters.SearchFilter                           # For partial matches (search)
    ]

    # Field to use for exact location filtering (e.g., /api/jobs/?location=New York)
    filterset_fields = ['location'] 

    # Fields to use for partial text search (e.g., /api/jobs/?search=developer)
    search_fields = ['title', 'description', 'company_name'] 
    # --- End of new lines ---


# This ViewSet provides all actions for the Application model
class ApplicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows applications to be viewed or edited.
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    # We'll add permissions here so only the applicant can see their
    # applications, and only recruiters can see applications for their jobs.


# This ViewSet provides all actions for the User model
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer