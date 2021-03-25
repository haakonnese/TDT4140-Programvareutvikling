from django.urls import path
from . import views

urlpatterns = [
    path("register", views.register_ad, name="register_ad"),
    path("listings", views.view_ads, name="view_ads"),
    path("listing/<id>", views.view_single_ad, name="view_single_ad"),
    path("categories", views.view_categories, name="view_categories"),
    path("listing/<id>/edit", views.change_ad, name="view_change_ad"),
    path("listing/<id>/delete", views.delete_ad, name="view_delete_ad"),
    path("listings/mylistings", views.view_users_ads, name="view_users_ads"),
]
