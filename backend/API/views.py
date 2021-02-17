# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from .models import Ad
from .serializers import AdSerializer


def index(request):
    return HttpResponse("Hello. You're at the Ad index.")

def register_person(request):
    return ""

@api_view(['POST'])
def ad_list(request):
    """
    Create a new Ad.
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AdSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def ad_detail(request, pk):
    """
    Retrieve, update or delete an ad.
    """
    try:
        ad = Ad.objects.get(pk=pk)
    except Ad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AdSerializer(ad)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AdSerializer(ad, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        ad.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

