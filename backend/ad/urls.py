from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_ad, name="register_ad"),
    path("view/<int:pk>", views.ad_detail, name="ad_detail"),
    path("ads", views.view_ads, name="view_ads"),
    path("ad", views.view_single_ad, name="view_single_ad"),
]
