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


    
