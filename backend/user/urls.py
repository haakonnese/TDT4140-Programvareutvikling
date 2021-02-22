from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user.views import register_profile, get_profile

urlpatterns = [
    path("register", register_profile),
    path("user", get_profile),
    path("login", obtain_auth_token, name="login"),
]
