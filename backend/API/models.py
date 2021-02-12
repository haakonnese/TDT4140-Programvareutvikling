from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


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


class Ad(models.Model):
    created_by_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    pub_date = models.DateField()
    headline = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.headline


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
