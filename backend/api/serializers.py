from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    # Fields for registration
    password = serializers.CharField(write_only=True, min_length=8, help_text="Password must be at least 8 characters.")
    confirm_password = serializers.CharField(write_only=True, help_text="Re-enter your password.")


    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password',]
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False, 'help_text': 'A valid email address is required.'},
            'username': {'help_text': 'Unique username for the user.'},
            
        }

    def validate_email(self, value):
        """
        Ensure email is unique.
        """
        if User.objects.filter(email=value).exists():
            raise ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        """
        Ensure password and confirm_password match.
        """
        if data['password'] != data['confirm_password']:
            raise ValidationError("Password and Confirm Password do not match.")
        return data
    
    def create(self, validated_data):
        """
        Create a new user instance and ensure a Token is generated for authentication.
        """
        # Remove confirm_password from the validated data as it is not needed for user creation
       
        
        # Create the user with validated data
        user = User.objects.create_user(
            username=validated_data['username'],  # Username field
            email=validated_data['email'],  # Email field
            password=validated_data['password'],  # Password field
              # Optional last_name
        )
        
        # Automatically create a Token for the new user
        Token.objects.create(user=user)
        
        return user
