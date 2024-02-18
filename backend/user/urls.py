# example/urls.py
from django.urls import path

from user.views import index


urlpatterns = [
    path('', index),
]