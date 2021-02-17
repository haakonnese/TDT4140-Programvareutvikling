from django.urls import path

from . import views

urlpatterns = [
    path("", views.register_person, name="register_person"),
    path('', views.index, name="index"),
]
