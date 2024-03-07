# example/urls.py
from django.urls import path, include
from rest_framework import routers, serializers, viewsets



urlpatterns = [
    path('', include('home.urls')),
    path('user/', include('user.urls')),
    path('auth/', include('authentication.urls')),
    path('showcase/', include('showcase.urls')),
    path('diary/', include('diaryEntries.urls'))
]