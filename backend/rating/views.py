from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RatingSerializer
from ad.models import Ad
from ad.serializers import AdSerializer
from rest_framework import status


@api_view(["POST"])
def register_rating(request):
    response = Response()
    data = request.data
    ad = Ad.objects.get(id=data.pop("id"))
    if request.user.is_anonymous:
        response.data = "No valid token detected!"
        response.status = status.HTTP_403_FORBIDDEN
        return response
    if ad is None:
        response.data = "This ad doesn't exist."
        response.status = status.HTTP_403_FORBIDDEN
        return response
    data["written_by_user"] = request.user.pk
    rating = RatingSerializer.create(RatingSerializer(), data)
    d = {}
    d["rating"] = rating.id
    AdSerializer.update(AdSerializer(), instance=ad, validated_data=d)
    response.data = RatingSerializer(rating).data
    return response
