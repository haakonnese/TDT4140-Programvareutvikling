from django.db import models
from django.contrib.auth.models import User


# Modell for profil.
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    phone = models.CharField(max_length=80)
    city = models.CharField(max_length=50)
    birth_year = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username
