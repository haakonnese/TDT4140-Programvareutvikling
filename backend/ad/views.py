# from django.shortcuts import render

# Create your views here.
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from django.http import HttpResponse, Http404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Ad, Category
from .serializers import AdSerializer, CategorySerializer
from .forms import ImageForm
from rest_framework.permissions import IsAuthenticated
from user.models import Profile
from django.contrib.auth.models import User
import math


def index(request):
    return HttpResponse("Hello. You're at the Ad index.")


@api_view(["POST"])
def view_ads(request):
    context = []
    data = request.data
    arguments = {}
    if data.get("category") is not None:
        arguments["category"] = data["category"]
    if data.get("city") is not None:
        arguments["city__iexact"] = data["city"]
    if data.get("min") is not False:
        arguments["price__gte"] = data["min"]
    if data.get("max") is not False:
        arguments["price__lte"] = data["max"]
    try:
        page = int(data.get("page"))
    except ValueError:
        return Response(status=status.HTTP_400_BAD_REQUEST, data="Page is missing")
    ads = Ad.objects.filter(**arguments).order_by("-pub_date")
    ads_per_page = 12
    num = math.ceil(ads.count() / ads_per_page)
    ads = ads[(page - 1) * ads_per_page : ads_per_page * page]
    for ad in ads:
        context.append(AdSerializer(ad).data)
    return Response({"num_pages": num, "products": context})


@api_view(["GET"])
def view_single_ad(request, id):
    try:
        response = AdSerializer(Ad.objects.get(id=id))
        user = User.objects.get(username=Ad.objects.get(id=id).created_by_user)
        profile = Profile.objects.get(user=user)
        d = {"phone": profile.phone, "first_name": user.first_name, "last_name": user.last_name}
        d.update(response.data)
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
        return Response("Successfully uploaded", status=status.HTTP_201_CREATED)
    return Response("Error on uploaded", status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def view_categories(request):
    """view all categories from Category-model"""
    context = []
    for category in Category.objects.all().order_by("category"):
        context.append(CategorySerializer(category).data)
    return Response(context)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_ad(request, id):
    """
    Update an ad.
    """
    try:
        ad = Ad.objects.get(id=id)
    except Ad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if ad.created_by_user == Profile.objects.get(user=request.user):
        updated_request = request.POST.copy()
        updated_request.pop("created_by_user")
        updated_request.update({"created_by_user": Profile.objects.get(user=request.user)})
        category = Category.objects.get(category=updated_request["category"])
        updated_request.pop("category")
        updated_request.update({"category": category})
        form = ImageForm(updated_request, request.FILES, instance=ad)
        if form.is_valid():
            form.save()
            return Response("Successfully edited", status=status.HTTP_200_OK)
        return Response("Error on uploaded", status=status.HTTP_400_BAD_REQUEST)
    return Response("Currently logged in user did not create this ad", status=status.HTTP_401_UNAUTHORIZED)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_ad(request, id):
    """
    Delete an ad.
    """
    try:
        ad = Ad.objects.get(id=id)
    except Ad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if ad.created_by_user == Profile.objects.get(user=request.user):
        ad.delete()
        return Response("Successfully deleted the ad", status=status.HTTP_204_NO_CONTENT)
    return Response("Currently logged in user did not create this ad", status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def view_users_ads(request):
    context = []
    for ad in Ad.objects.all().order_by("-pub_date"):
        if ad.created_by_user == Profile.objects.get(user=request.user):
            context.append(AdSerializer(ad).data)
    return Response(context)
