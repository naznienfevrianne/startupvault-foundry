# example/urls.py
from django.urls import path, include

from user.views import index


urlpatterns = [
    path('', include('user.urls')),
]