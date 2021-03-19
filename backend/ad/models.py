from django.db import models
from user.models import Profile
from PIL import Image

# Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=40, primary_key=True)

    def __str__(self):
        return self.category


class Ad(models.Model):
    created_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.PositiveIntegerField()
    img = models.ImageField(upload_to="product/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    city = models.CharField(max_length=100, default="Ikke oppgitt")

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Ad, self).save(*args, **kwargs)
        image = Image.open(self.img.path)
        if image.height > 1000:
            ratio = 1000 / image.height
            size = 1000, image.width * ratio
            image.thumbnail(size)
        image.save(self.img.path, quality=80, optimize=True)
