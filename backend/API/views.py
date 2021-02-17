# from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello. You're at the Ad index.")

def register_person(request):
    return ""