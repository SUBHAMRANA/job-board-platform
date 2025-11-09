from django.contrib import admin
from .models import User, Job, Application # Import our 3 models

# This is a simple way to register
admin.site.register(User)
admin.site.register(Job)
admin.site.register(Application)