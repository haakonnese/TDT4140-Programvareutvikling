from rest_framework import serializers
from .models import Rating
from user.models import Profile


class RatingSerializer(serializers.ModelSerializer):
    written_by_user = Profile

    class Meta:
        model = Rating
        fields = ("stars", "description", "written_by_user")

    def create(self, validated_data):
        """Create rating with validated data"""
        profile_data = validated_data.pop("written_by_user")
        profile = Profile.objects.get(pk=profile_data)
        rating, created = Rating.objects.update_or_create(
            stars=validated_data.pop("stars"), description=validated_data.pop("description"), written_by_user=profile
        )
        return rating
