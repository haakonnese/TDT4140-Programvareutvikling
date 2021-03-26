from rest_framework.response import Response
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework import status
from django.contrib.auth.models import User


@api_view(["POST"])
def register_profile(request):
    """Funksjon that creates a new profile."""
    if request.method == "POST":
        # creates a profileserializer
        serializer = ProfileSerializer(data=request.data)
        # checks if data is valid
        if serializer.is_valid(raise_exception=ValueError):
            user = serializer.create(validated_data=request.data)
            token = Token.objects.get(user=user.user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_profile(request):
    """Returns the profile of the user currently logged on."""
    response = Response()
    if request.user.is_anonymous:
        return Response(status=status.HTTP_403_FORBIDDEN)
    print(request.user)
    response.data = ProfileSerializer(request.user.profile).data
    response.status_code = status.HTTP_200_OK
    return response


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@api_view(["PUT"])
def edit_profile(request):
    """Edits the profile currently logged on."""
    response = Response()
    data = request.data
    if request.user.is_anonymous:
        response.status_code = status.HTTP_403_FORBIDDEN
        response.data = "No valid token detected!"
        return response
    if (
        data.get("user") is not None
        and User.objects.filter(username=data["user"].get("username")).exists()
        and data["user"]["username"] != request.user.username
    ):
        response.status_code = status.HTTP_403_FORBIDDEN
        response.data = "The username is already in use!"
        return response
    ProfileSerializer.update(ProfileSerializer(), instance=request.user.profile, validated_data=data)
    response.status_code = status.HTTP_200_OK
    profile_data = ProfileSerializer(request.user.profile).data
    profile_data.get("user").pop("password")
    response.data = profile_data
    return response


@api_view(["PUT"])
def edit_password(request):
    """Changes the password of the user currently logged on."""
    response = Response()
    if request.user.is_anonymous:
        response.status_code = status.HTTP_403_FORBIDDEN
        return response
    password = request.data["password"]
    request.user.set_password(password)
    request.user.save()
    response.status_code = status.HTTP_200_OK
    response.data = "Password changed successfully"
    return response
