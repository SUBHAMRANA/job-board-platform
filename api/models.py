from django.db import models
from django.contrib.auth.models import AbstractUser

# We're extending Django's built-in User model
# to add a 'role' field.
class User(AbstractUser):
    ROLE_CHOICES = (
        ('seeker', 'Job Seeker'),
        ('recruiter', 'Recruiter'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='seeker')

    def __str__(self):
        return self.username

# This is the model for the job listings
class Job(models.Model):
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    
    # This links the job to the recruiter (a User) who posted it.
    # on_delete=models.CASCADE means if a recruiter is deleted, their jobs are also deleted.
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    
    # This is the key for our "Admin Approval" feature
    is_approved = models.BooleanField(default=False) 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.company_name}"

# This model connects a Job Seeker (User) to a Job they applied for
class Application(models.Model):
    # This is for your "File Upload" goal
    # The 'upload_to' tells Django to store resumes in a 'resumes/' folder
    # in your S3 bucket (which we'll configure later).
    resume = models.FileField(upload_to='resumes/')
    
    # Links to the job being applied for
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    
    # Links to the user (seeker) who is applying
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant.username}'s application for {self.job.title}"