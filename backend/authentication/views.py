from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse, JsonResponse

from backend import settings
from .models import *
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


class UserModelListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer

class FounderListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Founder.objects.all()
    serializer_class = FounderSerializer
    
class PartnerListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class InvestorListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Investor.objects.all()
    serializer_class = PartnerSerializer

class StartupListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer


class FounderRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]  # pake IsAuthenticated kalo udah ada token login
    serializer_class = FounderSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return Founder.objects.all()

class StartupRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    serializer_class = StartupSerializer

    def get_queryset(self):
        # return Startup.objects.filter(user=self.request.user)
        return Startup.objects.all()


    
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        email_req = data.get('email')
        print("email_req " + email_req)
        password_req = data.get('password')
        print("password_req " + password_req)
        user = UserModel.objects.filter(email=email_req).first()
        if user is not None:
           
            if user.password == password_req:
                payload = None
                
                if user.role == "founder":
                    user = Founder.objects.filter(email=email_req).first()
                    payload = model_to_dict(user)
                    payload.pop('password', None)
                elif user.role == "investor":
                    user = Investor.objects.filter(email=email_req).first()
                    payload = model_to_dict(user)
                    payload.pop('password', None)
                else:
                    user = Partner.objects.filter(email=email_req).first()
                    payload = model_to_dict(user)
                    payload.pop('password', None)
                # payload_json = json.dumps(payload)
                jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
                return JsonResponse({"token":jwt_token, **payload}, status=200)
            else:
                return JsonResponse({"status":"failed", "login":False,"message":"Password false"}, status=400)
        else:

            return JsonResponse({"status":"failed", "login":False,"message":"User not found"}, status=404)


