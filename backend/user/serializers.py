from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password", "first_name", "last_name")

    def create(self, validated_data):
        """Create user with validated data"""
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Profile
        fields = ("user", "city", "phone", "birth_year")

    def create(self, validated_data):
        """
        Overriding the default create method of the Model serializer.
        :param validated_data: data containing all the details of profile
        :return: returns a successfully created profile record
        """
        user_data = validated_data.pop("user")
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        profile, created = Profile.objects.update_or_create(
            user=user,
            city=validated_data.pop("city"),
            phone=validated_data.pop("phone"),
            birth_year=validated_data.pop("birth_year"),
        )
        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.get("user")
        if user_data is not None:
            UserSerializer.update(UserSerializer(), instance=instance.user, validated_data=user_data)
        instance.city = validated_data.get("city", instance.city)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.birth_year = validated_data.get("birth_year", instance.birth_year)
        instance.save()
        return instance
