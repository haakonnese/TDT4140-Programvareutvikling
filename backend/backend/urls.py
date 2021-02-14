from django.contrib import admin
from django.urls import path
from API.views import register_profile, login_user, get_profile, logout_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("API/register", register_profile),
    path("API/login", login_user),
    path("API/logout", logout_view),
    path("API/user", get_profile),
]
