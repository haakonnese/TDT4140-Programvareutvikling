from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from .models import Ad


@api_view(["POST"])
def register_profile(request):
    if request.method == "POST":
        q_dict = request.POST
        user = User.objects.create_user(
            q_dict["username"], q_dict["email"], q_dict["password"]
        )  # skal objektet være profile i stedet for user?
        user.refresh_from_db()  # load the profile instance created by the signal
        user.profile.birth_year = q_dict["birth_year"]
        user.profile.city = q_dict["city"]
        user.profile.phone = q_dict["phone"]
        user.save()
        return HttpResponse("user got saved.")


def login_user(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        pass
        # Return an 'invalid login' error message.


def logout_view(request):
    logout(request)


def get_persons(request):
    users = User.objects.all()
    return HttpResponse(users)


def view_ads(request):
    context = {}
    context["dataset"] = Ad.objects.all().order_by("-pub_date")
    return render(request, "list_view.html", context)  # html-filen må ha navnet som frontend har laget


def view_single_ad(request, id):
    context = {}
    context["data"] = Ad.objects.get(id=id)
    return render(request, "detail.html", context)  # html-filen må ha navnet som frontend har laget
