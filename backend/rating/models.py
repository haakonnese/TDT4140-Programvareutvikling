from django.db import models
from user.models import Profile
from django.core.validators import MinValueValidator, MaxValueValidator


class Rating(models.Model):
    stars = models.SmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    description = models.TextField()
    written_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
