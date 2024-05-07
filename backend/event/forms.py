from django import forms
from .models import Event

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['name', 'summary', 'desc', 'location', 'date', 'price', 'link', 'image', 'isVerified', 'rejectionNote']
