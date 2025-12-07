from rest_framework import serializers
from .models import User, Job, Application

class UserSerializer(serializers.ModelSerializer):
    # We add 'password' here so we can write to it, 
    # but 'write_only=True' ensures it NEVER comes back in the response.
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'password']

    # This function runs when we create a new user
    def create(self, validated_data):
        # We pop (remove) the password from the data...
        password = validated_data.pop('password')

        # ...create the user instance...
        user = User(**validated_data)

        # ...and properly hash the password!
        user.set_password(password)
        user.save()
        return user

# Serializer for the Job model
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
        # ADD THIS LINE:
        # This tells Django: "Don't ask the user for this field."
        read_only_fields = ['recruiter']

# Serializer for the Application model
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'