from rest_framework import viewsets
from .models import User, Job, Application
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # We'll use these soon
from rest_framework import viewsets, filters # <-- Add 'filters'
# ... other imports
import django_filters

from rest_framework import viewsets, filters
from .models import User, Job, Application
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer
# Import the permission classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly 
import django_filters

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_approved=True)
    serializer_class = JobSerializer
    
    # 1. PERMISSIONS:
    # "IsAuthenticatedOrReadOnly" means:
    # - Anyone can READ (GET) the list of jobs.
    # - Only Logged-in users can WRITE (POST/PUT/DELETE).
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter
    ]
    filterset_fields = ['location']
    search_fields = ['title', 'description', 'company_name']

    # 2. AUTO-ASSIGN RECRUITER:
    # This method runs automatically when a new Job is created.
    def perform_create(self, serializer):
        # We tell the serializer: "Save this job, and set the 'recruiter' 
        # field to the user who sent the request."
        serializer.save(recruiter=self.request.user)


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