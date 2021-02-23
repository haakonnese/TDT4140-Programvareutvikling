from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models.base import ObjectDoesNotExist
from django.http import Http404
from .models import Ad
from .serializers import AdSerializer


@api_view(["GET"])
def view_ads(request):
    context = []
    for ad in Ad.objects.all().order_by("-pub_date"):
        context.append(AdSerializer(ad).data)
    return Response(context)


@api_view(["GET"])
def view_single_ad(request, id):
    try:
        response = AdSerializer(Ad.objects.get(id=id))
        return Response(response.data)
    except ObjectDoesNotExist:
        raise Http404
