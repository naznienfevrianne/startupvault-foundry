# example/urls.py
from django.urls import path, include
from rest_framework import routers, serializers, viewsets



urlpatterns = [
    path('', include('home.urls')),
    path('user/', include('user.urls')),
    path('diary/', include('diaryentries.urls')),
]