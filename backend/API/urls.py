from django.urls import path

from . import views

urlpatterns = [path("", views.view_ads(), name="view_ads"), path("", views.view_single_ad(), name="view_single_ad")]
