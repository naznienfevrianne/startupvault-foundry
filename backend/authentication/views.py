from django.shortcuts import render
from datetime import datetime, timedelta
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
from functools import wraps
from rest_framework  import permissions
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from rest_framework import exceptions


class JWTAuthentication(permissions.BasePermission):
    def has_permission(self, request, view):
        
        # # Get all request headers
        # headers = request.META

        # # Print each header
        # for key, value in headers.items():
        #     print(f"{key}: {value}")
        token = request.headers.get('Authorization', None)

        if not token:
            return False
        else:
            print("check")
            token = token.encode('utf-8')[7:]
            print(token)
            try_to_decode = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            print(try_to_decode)
                
            try:
                user = UserModel.objects.get(email=try_to_decode['email'])
            except UserModel.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

            print(user)
            # Here you can add logic to check if the user is authorized to access the endpoint
            # For example, you can check if the user has the necessary permissions
            # If not authorized, return False
            request.user = user
            print("here2")
            return True
            # except jwt.DecodeError:
            #     raise exceptions.AuthenticationFailed("Invalid token")
            # except jwt.ExpiredSignatureError:
            #     raise exceptions.AuthenticationFailed("Token has expired")
               
class UserModelListCreate(generics.ListCreateAPIView):
    permission_classes = [JWTAuthentication]
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
    serializer_class = InvestorSerializer

class StartupListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer
    
class InvestorOrganizationListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = InvestorOrganization.objects.all()
    serializer_class = InvestorOrganizationSerializer
    
class PartnerOrganizationListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = PartnerOrganization.objects.all()
    serializer_class = PartnerOrganizationSerializer
    
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
                jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
                try_to_decode = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=["HS256"])
                print("login")
                print(try_to_decode)
                print(jwt_token)
                return JsonResponse({"token":jwt_token, **payload}, status=200)
            else:
                return JsonResponse({"status":"failed", "login":False,"message":"Password false"}, status=400)
        else:

            return JsonResponse({"status":"failed", "login":False,"message":"User not found"}, status=404)
        

@csrf_exempt
def check_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email_req = data.get('email')
        user = UserModel.objects.filter(email=email_req).first()
        if user is None:
            return JsonResponse({"message":"success"}, status=200)
        else:
            return JsonResponse({"message":"Email already used"}, status=409)
        
class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication] 
    serializer_class = UserModelSerializer

    def get_queryset(self):
        return UserModel.objects.all()
        
def test_token(request):
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDkxNjQ2MDAsImlhdCI6MTY0OTE2MjYwMCwic3ViIjoiYXV0aGVudGljYXRlZCJ9.dT2-WIUcYEDb4nRQ4LhHoyAmLl8QdU2m0f1co-Wp8DU'

    try:
        # Decode the token
        decoded_payload = jwt.decode(token, options={"verify_signature": False})

        # Extract the expiration time from the payload
        exp_timestamp = decoded_payload['exp']

        # Convert the timestamp to a human-readable format
        exp_datetime = datetime.utcfromtimestamp(exp_timestamp)

        # Print the expiration time
        print("Token expiration time:", exp_datetime)
    except jwt.ExpiredSignatureError:
        print("Token has expired")
    except jwt.InvalidTokenError:
        print("Invalid token")
    return JsonResponse({"message": "pass"}, status=200)

class InvestorOrganizationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication] 
    serializer_class = InvestorOrganizationSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return InvestorOrganization.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.method == 'PUT'  # Check if request method is PUT
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
class PartnerOrganizationRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = PartnerOrganizationSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return PartnerOrganization.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class InvestorRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication] 
    serializer_class = InvestorSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return Investor.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.method == 'PUT'  # Periksa apakah metode permintaan adalah PUT
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Buat payload baru dengan data investor yang diperbarui
        payload = model_to_dict(instance)
        payload.pop('password', None)
        
        # Buat token JWT baru
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        # Kirim respons JSON dengan token JWT baru dan data investor yang diperbarui
        return Response({"token": jwt_token, **payload}, status=200)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class PartnerRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication] 
    serializer_class = PartnerSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return Partner.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.method == 'PUT'  # Periksa apakah metode permintaan adalah PUT
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Buat payload baru dengan data investor yang diperbarui
        payload = model_to_dict(instance)
        payload.pop('password', None)
        
        # Buat token JWT baru
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        # Kirim respons JSON dengan token JWT baru dan data investor yang diperbarui
        return Response({"token": jwt_token, **payload}, status=200)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
class FounderRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication] 
    serializer_class = FounderSerializer

    def get_queryset(self):
        # Only allow the authenticated user to retrieve and update their own startup information
        # pake pas udah ada token login
        # return Founder.objects.filter(user=self.request.user)
        return Founder.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.method == 'PUT'  # Periksa apakah metode permintaan adalah PUT
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Buat payload baru dengan data investor yang diperbarui
        payload = model_to_dict(instance)
        payload.pop('password', None)
        
        # Buat token JWT baru
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        # Kirim respons JSON dengan token JWT baru dan data investor yang diperbarui
        return Response({"token": jwt_token, **payload}, status=200)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class StartupRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = StartupSerializer

    def get_queryset(self):
        # return Startup.objects.filter(user=self.request.user)
        return Startup.objects.all()
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class TopStartupRetriever(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = StartupSerializer

    def get_queryset(self):
        startups = Top10Startup.objects.all().order_by('-id').first()
        list_startup = []
        for i in range(1, 11):
            startup = getattr(startups, f"rank{i}")
            list_startup.append(startup)
        
        startup_info = []
        for startup in list_startup:
            info = Startup.objects.filter(id=startup).first()
            startup_info.append(info)
        return startup_info

        




