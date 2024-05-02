from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import generics, filters, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.response import Response
from authentication.views import JWTAuthentication
import django_filters


# Create your views here.
class EventDetailsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = Event.objects.all()
    serializer_class = ReadEventSer