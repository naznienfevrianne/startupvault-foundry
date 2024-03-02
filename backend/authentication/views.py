from django.shortcuts import render
from datetime import datetime
from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

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


    
