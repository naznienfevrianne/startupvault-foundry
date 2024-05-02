from django.shortcuts import render
from datetime import datetime, timedelta
from django.http import HttpResponse, JsonResponse

from backend import settings
from .models import Event
from .serializers import *
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
import json
import jwt
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.forms.models import model_to_dict
from functools import wraps
from rest_framework  import permissions
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from rest_framework import exceptions
# Create your models here.
class EventListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Event.objects.filter(isVerified=1)
    serializer_class = EventSerializer
    
class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] 
    serializer_class = EventSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return Event.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.method == 'PUT'  # Check if request method is PUT
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    