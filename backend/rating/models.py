from django.db import models
from user.models import Profile


class Rating(models.Model):
    stars = models.SmallIntegerField()
    description = models.TextField()
    written_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
