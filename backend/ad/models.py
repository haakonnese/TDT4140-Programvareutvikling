from django.db import models
from user.models import Profile
from PIL import Image
from rating.models import Rating

# Create your models here.


class Category(models.Model):
    category = models.CharField(max_length=40, primary_key=True)

    def __str__(self):
        return self.category


class Ad(models.Model):
    created_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.PositiveIntegerField()
    img = models.ImageField(upload_to="product/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    city = models.CharField(max_length=100, default="Ikke oppgitt")
    rating = models.ForeignKey(Rating, on_delete=models.SET_NULL, null=True, blank=True)
    sold = models.BooleanField(default=False)
    sold_date = models.DateTimeField(null=True, blank=True)

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


class Favorite(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=False)
    ad = models.ForeignKey(Ad, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.profile.__str__() + ": " + self.ad.__str__()

    class Meta:
        unique_together = (("profile", "ad"),)
