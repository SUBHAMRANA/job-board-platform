from rest_framework import viewsets
from .models import User, Job, Application
from .serializers import UserSerializer, JobSerializer, ApplicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny # We'll use these soon

# This ViewSet provides all actions for the Job model
class JobViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows jobs to be viewed or edited.
    """
    # This is the KEY to your "Admin Approval" feature.
    # The API will ONLY show jobs where 'is_approved' is True.
    queryset = Job.objects.filter(is_approved=True)
    serializer_class = JobSerializer

    # We'll set permissions here later. For now, anyone can do anything.
    # permission_classes = [AllowAny] 


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