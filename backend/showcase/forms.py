from django import forms
from django.forms import ModelForm
from models import *

class ShowcasePostForm(ModelForm):
    class Meta:
        model = ShowcasePost
        fields = ["content"]

class PostImageForm(ModelForm):
    image = forms.ImageField(
        label = "Image",
        widget = forms.ClearableFileInput(attrs={'multiple': True})
    )
    class Meta:
        model = PostImage
        field = ["image"]


