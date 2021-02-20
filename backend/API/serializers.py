from rest_framework import serializers
from .models import Ad


class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ["created_by_user", "pub_date", "headline", "description", "price", "image", "category"]

    def create(self, validated_data):
        """
        Create and return a new `Ad` instance, given the validated data.
        """
        ad = Ad.objects.create(**validated_data)
        return ad

    def update(self, instance, validated_data):
        """
        Updates and return an existing `Ad` instance, given the validated data.
        """
        instance.created_by_user = validated_data.get("created_by_user", instance.created_by_user)
        instance.pub_date = validated_data.get("pub_date", instance.pub_date)
        instance.headline = validated_data.get("headline", instance.headline)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.image = validated_data.__get("image", instance.image)
        instance.category = validated_data.get("category", instance.category)
        instance.save()

        return instance
