# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ad
from .serializers import AdSerializer
from .forms import ImageForm
from django.shortcuts import render, redirect


def index(request):
    return HttpResponse("Hello. You're at the Ad index.")

def register_person(request):
    return ""

def image_upload_view(request):
    template = loader.get_template('API/index.html')
    """Process images uploaded by users"""
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()

            #return redirect(ad_list)
            return HttpResponse('Successfully uploaded')
    else:
        form = ImageForm()
    return render(request, 'API/index.html', {'form' : form})


# @api_view(['POST'])
# def ad_list(request):
#     """
#     Create a new Ad.
#     """
#     if request.method == 'POST':
#         serializer = AdSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        serializer = AdSerializer(ad, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        ad.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


