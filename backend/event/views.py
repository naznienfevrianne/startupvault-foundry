from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework.views import APIView

from backend import settings
from .forms import EventForm
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
from authentication.models import Partner
from authentication.views import JWTAuthentication


# Create your models here.
class EventListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Event.objects.filter(isVerified=1)
    serializer_class = EventSerializer
    
class EventRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] 
    
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return EventDetailsSer
        else:
            return EventSerializer

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


@csrf_exempt
def create_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form = EventForm(data)
        if form.is_valid():
            event = form.save(commit=False)
            partner_id = data.get('partner')
            event.partner = Partner.objects.get(id=partner_id)
            event.save()
            return JsonResponse({'status': 'success', 'event_id': event.pk}, status=201)
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    else:
        form = EventForm()
    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=405)

class EventsByPartnerView(generics.ListCreateAPIView):
    permission_classes = [JWTAuthentication]

    def get(self, request, partner_id):
        # Assuming you have some way to ensure the requester has the right to see these events
        try:
            # Filter events by the provided partner_id
            events = Event.objects.filter(partner__id=partner_id)
            response_data = {
                'not_verified': EventSerializer(events.filter(isVerified=0), many=True).data,
                'verified': EventSerializer(events.filter(isVerified=1), many=True).data,
                'rejected': EventSerializer(events.filter(isVerified=2), many=True).data
            }
            return Response(response_data)
        except Partner.DoesNotExist:
            return Response({'error': 'Partner not found'}, status=404)