# example/urls.py
from django.urls import path, include
from rest_framework import routers, serializers, viewsets



urlpatterns = [
    path('user/', include('user.urls')),
]