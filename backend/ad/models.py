from django.db import models
from user.models import Profile

# Create your models here.


class Ad(models.Model):
    created_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.PositiveIntegerField()
    img = models.ImageField(upload_to="product/")
    category = models.CharField(max_length=50)
    city = models.CharField(max_length=100, default="Ikke oppgitt")

    def __str__(self):
        return self.name
