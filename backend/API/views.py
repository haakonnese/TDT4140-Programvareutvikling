# from django.shortcuts import render

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from .serializers import ProfileSerializer
from django.contrib.auth.decorators import login_required


@api_view(["POST"])
def register_profile(request):
    respons = HttpResponse()
    if request.method == "POST":
        q_dict = request.POST
        user = User.objects.create_user(q_dict["username"], q_dict["email"], q_dict["password"])
        user.first_name = q_dict["firstname"]
        user.last_name = q_dict["lastname"]
        user.save()
        user.refresh_from_db()  # Hent profilen lagret i databasen
        user.profile.birth_year = q_dict["birth_year"]
        user.profile.city = q_dict["city"]
        user.profile.phone = q_dict["phone"]
        user.save()
        respons.status_code = 200
        respons.write(ProfileSerializer(user.profile).data)
        return respons
    else:
        respons.status_code = 405
        respons.write("Aksepterer kun POST forespørsel!")
        return respons


@api_view(["POST"])
def login_user(request):  # 403, denne fungerer ikke.
    respons = HttpResponse()
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    print("hei")
    if user is not None:
        login(request, user)
        respons.status_code = 200
        respons.write(ProfileSerializer(user.profile).data)
        return respons
    else:
        respons.status_code = 404
        return respons


def logout_view(request):  # Fungerer ikke før man kan logge inn.
    logout(request)
    return HttpResponse("Du er logget ut!")


@login_required
def get_profile(request):
    respons = HttpResponse()
    respons.write(ProfileSerializer(request.user.profile).data)
    return respons
