from django import forms
from .models import Ad


class ImageForm(forms.ModelForm):
    """Form for the image model"""

    class Meta:
        model = Ad
        fields = ("created_by_user", "name", "description", "price", "img", "category")
        # ields = ('image',)
