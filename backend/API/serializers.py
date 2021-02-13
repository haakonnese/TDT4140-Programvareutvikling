from rest_framework import serializers
from django.contrib.auth.models import User


# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class ProfileSerializer(serializers.Serializer):
    user = UserSerializer()
    phone = serializers.CharField(max_length=200)
    city = serializers.CharField(max_length=200)
    birth_year = serializers.CharField(max_length=200)
