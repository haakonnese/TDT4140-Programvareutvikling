from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import RatingSerializer
from .models import Rating
from ad.models import Ad
from ad.serializers import AdSerializer
from user.serializers import UserSerializer
from rest_framework import status
from django.contrib.auth.models import User


@api_view(["POST"])
def register_rating(request):
    """
    Funksjon som registrer en rating på en annonse.
    Input format: {
        "id": 31,
        "stars": 7,
        "description": "Beskrivende tekst mer utfyllende"
    }
    """
    response = Response()
    data = request.data
    ad = Ad.objects.get(id=data.pop("id"))
    # Bruker kan ikke være annonym.
    if request.user.is_anonymous:
        response.data = "No valid token detected!"
        response.status = status.HTTP_403_FORBIDDEN
        return response
    # Annonsen må eksistere for å kunne gi den en rating.
    if ad is None:
        response.data = "This ad doesn't exist."
        response.status = status.HTTP_403_FORBIDDEN
        return response
    data["written_by_user"] = request.user.pk
    rating = RatingSerializer.create(RatingSerializer(), data)
    d = {}
    d["rating"] = rating.id
    # Oppdaterer adden med informasjon om rating
    AdSerializer.update(AdSerializer(), instance=ad, validated_data=d)
    response.data = RatingSerializer(rating).data
    return response


@api_view(["GET"])
def get_rating(request, id):
    """
    Funksjon som henter alle ratings forbundet til en person.
    Output format: {
        "username": "testbendik@gmail.com",
        "first_name": "Test",
        "last_name": "Tester",
        "city": "Trondheim",
        "avg_rating": 7.5,
        "ratings": [ ... ]
    }"""
    response = Response()
    # Sjekker at brukeren eksisterer
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        response.data = "The user does not exist in the db"
        response.status = status.HTTP_204_NO_CONTENT
        return response
    data = UserSerializer(user).data
    data.pop("password")
    data["user_id"] = user.pk
    data["city"] = user.profile.city
    ads = Ad.objects.filter(created_by_user=id)
    ratings = []
    sum_ = 0
    # Legger til informasnon om hver rating i lista ratings
    for ad in ads:
        if ad.rating is not None:
            rating = Rating.objects.get(pk=ad.rating.pk)
            d = get_info_rating(rating, ad)
            sum_ += rating.stars
            ratings.append(d)
    if len(ratings) > 0:
        data["avg_rating"] = round(sum_ / len(ratings), 2)
    else:
        data["avg_rating"] = "Ingen tilbakemeldinger enda"
    data["ratings"] = ratings
    response.data = data
    response.status = status.HTTP_200_OK
    return response


def get_info_rating(rating, ad):
    """
    Hjelpe funksjon for å få ut en rating representasjon på riktig format
    """
    d = UserSerializer(rating.written_by_user.user).data
    d.pop("password")
    d["user_id"] = rating.written_by_user.pk
    d["ad_id"] = ad.pk
    d["name"] = ad.name
    d["stars"] = rating.stars
    d["description"] = rating.description
    return d
