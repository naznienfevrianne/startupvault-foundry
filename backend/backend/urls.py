# example/urls.py
from django.urls import path, include
from django.contrib import admin
from rest_framework import routers, serializers, viewsets
from . import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', include('home.urls')),
    path('user/', include('user.urls')),
    path('auth/', include('authentication.urls')),
    path('showcase/', include('showcase.urls')),
    path('diary/', include('diaryentries.urls')),
    path('admin/', admin.site.urls)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)