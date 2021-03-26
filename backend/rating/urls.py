from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_rating, name="register_rating"),
    path("user/<id>", views.get_rating, name="get_rating"),
]
