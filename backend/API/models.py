from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Person(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    by = models.CharField(max_length=50)
    telefon = models.CharField(max_length=80)

    def __str__(self):
        return self.User.username
