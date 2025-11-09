from rest_framework import serializers
from .models import User, Job, Application

# Serializer for our custom User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # We list the *specific* fields we want to expose.
        # NEVER expose the 'password' field!
        fields = ['id', 'username', 'email', 'role']

# Serializer for the Job model
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        # '__all__' is a simple shortcut to include all fields 
        # from the model.
        fields = '__all__'

# Serializer for the Application model
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'