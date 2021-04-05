from rest_framework import serializers
from .models import Ad, Category, Favorite
from rating.models import Rating


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["profile", "ad"]


class AdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ad
        fields = ["id", "created_by_user", "name", "description", "price", "img", "category", "city", "rating", "sold"]

    # def create(self, validated_data):
    #     """
    #     Create and return a new `Ad` instance, given the validated data.
    #     """
    #     ad = Ad.objects.create(**validated_data)
    #     return ad

    def update(self, instance, validated_data):
        """
        Updates and return an existing `Ad` instance, given the validated data.
        """
        instance.created_by_user = validated_data.get("created_by_user", instance.created_by_user)
        # instance.pub_date = validated_data.get('pub_date', instance.pub_date)
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.price = validated_data.get("price", instance.price)
        instance.img = validated_data.get("img", instance.img)
        instance.category = validated_data.get("category", instance.category)
        instance.city = validated_data.get("city", instance.city)
        rating = validated_data.get("rating")
        instance.sold = validated_data.get("sold", instance.sold)
        if rating is not None:
            instance.rating = Rating.objects.get(id=rating)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["category"]
