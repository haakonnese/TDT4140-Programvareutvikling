from django.urls import path

from . import views

urlpatterns = [
    path("", views.register_person, name="register_person"),
    path('', views.index, name="index"),
    path("view/<int:pk>", views.ad_detail, name="ad_detail"),
    #path("view/", views.ad_list, name="ad_list"),
    path('upload/', views.image_upload_view, name="image_upload"),
]
