from django import forms
from .models import Ad


class ImageForm(forms.ModelForm):
    """Form for the image model"""

    class Meta:
        model = Ad
        fields = ("created_by_user", "pub_date", "headline", "description", "price", "image", "category")
