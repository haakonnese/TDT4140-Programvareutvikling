# from django.shortcuts import render

# Create your views here.
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Ad, Category, Favorite
from .serializers import AdSerializer, CategorySerializer, FavoriteSerializer
from .forms import ImageForm
from rest_framework.permissions import IsAuthenticated
from user.models import Profile
from django.contrib.auth.models import User


def index(request):
    return HttpResponse("Hello. You're at the Ad index.")


@api_view(["GET"])
def view_ads(request):
    context = []
    if not request.user.is_anonymous:
        profile = Profile.objects.get(user=request.user)
    else:
        profile = None
    for ad in Ad.objects.all().order_by("-pub_date"):
        data = AdSerializer(ad).data
        if profile is not None:
            favorite = Favorite.objects.filter(profile=profile, ad=ad)
            if favorite.count() > 0:
                data.update({"favorite": True})
            else:
                data.update({"favorite": False})
        else:
            data.update({"favorite": False})

        context.append(data)
    return Response(context)


@api_view(["GET"])
def view_single_ad(request, id):
    try:
        response = AdSerializer(Ad.objects.get(id=id))
        user = User.objects.get(username=Ad.objects.get(id=id).created_by_user)
        profile = Profile.objects.get(user=user)
        d = {"phone": profile.phone, "first_name": user.first_name, "last_name": user.last_name}
        d.update(response.data)
        if not request.user.is_anonymous:
            favorite = Favorite.objects.filter(
                profile=Profile.objects.get(user=request.user), ad=Ad.objects.get(id=id)
            )
            if favorite.count() > 0:
                d.update({"favorite": True})
            else:
                d.update({"favorite": False})
        else:
            d.update({"favorite": False})

        return Response(d)
    except ObjectDoesNotExist:
        raise Http404


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_ad(request):
    """Create a new Ad."""
    updated_request = request.POST.copy()
    updated_request.update({"created_by_user": Profile.objects.get(user=request.user)})
    category = Category.objects.get(category=updated_request["category"])
    updated_request.pop("category")
    updated_request.update({"category": category})
    form = ImageForm(updated_request, request.FILES)
    if form.is_valid():
        form.save()
        return Response("Sucessfully uploaded", status=status.HTTP_201_CREATED)
    return Response("Error on uploaded", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def view_categories(request):
    """view all categories from Category-model"""
    context = []
    for category in Category.objects.all().order_by("category"):
        context.append(CategorySerializer(category).data)
    return Response(context)


@api_view(["GET", "PUT", "DELETE"])
def ad_detail(request, pk):
    """
    Retrieve, update or delete an ad.
    """
    try:
        ad = Ad.objects.get(pk=pk)
    except Ad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AdSerializer(ad)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = AdSerializer(ad, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        ad.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_favorite(request):
    """Create a new Ad."""
    updated_request = request.data.copy()
    updated_request.update({"profile": request.user})
    favorite = FavoriteSerializer(data=updated_request)
    if favorite.is_valid():
        favorite.save()
        return Response("Sucessfully saved favorite", status=status.HTTP_201_CREATED)
    return Response("Error on save", status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_favorite(request, id):
    """
    Remove favorite.
    """
    try:
        favorite = Favorite.objects.get(profile=Profile.objects.get(user=request.user), ad=Ad.objects.get(id=id))
        favorite.delete()
        return Response("Successfully removed favorite", status=status.HTTP_200_OK)
    except Favorite.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_favorites(request):
    context = []
    profile = Profile.objects.get(user=request.user)
    favorites = Favorite.objects.filter(profile=profile)
    for ad in Ad.objects.filter(id__in=favorites.values("ad")).order_by("-pub_date"):
        data = AdSerializer(ad).data
        data.update({"favorite": True})
        context.append(data)
    return Response(context)
