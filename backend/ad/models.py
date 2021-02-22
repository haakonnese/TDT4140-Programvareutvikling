from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    sellerTlf = models.CharField(max_length=80)
    city = models.CharField(max_length=50)
    birth_year = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username

class Ad(models.Model):
    created_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateField()
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    price = models.CharField(max_length=50)
    imgUrl = models.ImageField(upload_to="ads/")
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.headline
