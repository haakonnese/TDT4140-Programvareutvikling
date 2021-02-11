from django.urls import path

from . import views

urlpatterns = [
    path("", views.register_person, name="register_person"),
]
