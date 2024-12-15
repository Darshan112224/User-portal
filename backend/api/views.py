import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        print("Received data:", json.dumps(request.data, indent=4))
        username = request.data.get('username')
        email = request.data.get('email')

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        request.data['username'] = email  # Use email as username
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)  # Custom EmailBackend handles this
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"message": "Login successful", "token": token.key}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    """
    View to return the authenticated user's profile data
    """
    user = request.user  # Fetch the authenticated user
    serializer = UserSerializer(user)  # Serialize the user object
    return Response(serializer.data)  # Return the serialized user data as response


@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_users(request):
    # List all users (only for admin users)
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
