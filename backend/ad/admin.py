from django.contrib import admin

from .models import Ad, Category, Favorite

# Register your models here.
admin.site.register(Ad)
admin.site.register(Category)
admin.site.register(Favorite)
