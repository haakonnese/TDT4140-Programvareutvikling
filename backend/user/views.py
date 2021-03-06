from rest_framework.response import Response
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from django.core.exceptions import ObjectDoesNotExist


class LogIn(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(LogIn, self).post(request, *args, **kwargs)
        try:
            token = Token.objects.get(key=response.data["token"])
            return Response({"token": token.key, "user_id": token.user_id})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def register_profile(request):
    """
    Funksjon som lager en ny profil og
    returnerer en tilhørende token.
    Output format: {
    "token": "..."
    }
    """
    if request.method == "POST":
        # creates a profileserializer
        serializer = ProfileSerializer(data=request.data)
        # checks if data is valid
        if serializer.is_valid(raise_exception=ValueError):
            user = serializer.create(validated_data=request.data)
            token = Token.objects.get(user=user.user)
            return Response({"token": token.key, "user_id": user.user.id}, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_profile(request):
    """Returnerer profilen til brukeren som er innlogget.
    Output format: {
    "user": {
        "username": "test@gmail.com",
        "password": "...",
        "first_name": "Test",
        "last_name": "Tester"
    },
    "city": "Trondheim",
    "phone": "22222222",
    "birth_year": "2000"
    }
    """
    response = Response()
    if request.user.is_anonymous:
        return Response(status=status.HTTP_403_FORBIDDEN)
    print(request.user)
    response.data = ProfileSerializer(request.user.profile).data
    response.status_code = status.HTTP_200_OK
    return response


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """Lager en token tilhørende instansen"""
    if created:
        Token.objects.create(user=instance)


@api_view(["PUT"])
def edit_profile(request):
    """Endrer profilen til brukeren som er innlogget."""
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
    """Endrer passordet til brukeren som er innlogget."""
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
