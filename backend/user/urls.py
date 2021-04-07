from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user.views import register_profile, get_profile, edit_profile, edit_password, LogIn

urlpatterns = [
    path("register", register_profile),
    path("user", get_profile),
    path("login", LogIn.as_view(), name="login"),
    path("edit_profile", edit_profile),
    path("edit_password", edit_password),
]
