from django.shortcuts import render
from .models import Founder, Entry, FollowTable, Startup
from .serializers import MetricSerializer, FounderEntrySerializer, EntrySerializer, FollowedFounderEntrySerializer
from rest_framework import generics, filters
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
from django.utils import timezone
from authentication.views import JWTAuthentication
import django_filters


class MetricsRetrieve(generics.RetrieveAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = MetricSerializer

    def get_queryset(self):
        founderId = self.kwargs["founder"]
        instance = Entry.objects.filter(founder=founderId).order_by("-date").first()

        instanceDate = instance.date #tanggal entry
        today = timezone.now().date() #tanggal hari ini

        start_of_week = today - timedelta(days=today.weekday()) #Today minus integer weekday hari ini (Mon=0, Sunday=6)
        end_of_week = start_of_week + timedelta(days=6)

        if (start_of_week <= instanceDate <= end_of_week):
            return Entry.objects.filter(founder=founderId)
        else:
            return Entry.objects.none()
    
    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.order_by("-date").first() if queryset else None
        return obj
        
# Read & Create Diary Entry by Founder
class DiaryEntriesListCreate(generics.ListCreateAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = FounderEntrySerializer

    # Read
    def get_queryset(self):
        sort_by = self.request.query_params.get("sort", None)
        founderId = self.kwargs["founder"]

        start_date = self.request.query_params.get('startDate', None)
        end_date = self.request.query_params.get('endDate', None)

        if (sort_by is not None) and (start_date is not None) and (end_date is not None):
            return Entry.objects.all().filter(founder=founderId, date__range=[start_date, end_date]).order_by(sort_by)
        elif (sort_by is not None):    
            return Entry.objects.all().filter(founder=founderId).order_by(sort_by)

        return Entry.objects.filter(founder=founderId)

    # Create
    def perform_create(self, serializer):
        founderId = self.kwargs["founder"]
        founder = Founder.objects.get(pk=founderId)
        serializer.save(founder=founder)  

# Read & Update Diary Entry by Id
class DiaryEntriesRetrieveUpdate(generics.RetrieveUpdateAPIView):
    permission_classes = [JWTAuthentication]
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

# Read & Create Diary Entry by Followed Founder
class FollowedFounderDiaryEntriesList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = FollowedFounderEntrySerializer

    # Read
    def get_queryset(self):
        sort_by = self.request.query_params.get("sort", None)
        investor_id = self.kwargs["investor"]

        start_date = self.request.query_params.get('startDate', None)
        end_date = self.request.query_params.get('endDate', None)
        startup_name = self.request.query_params.get('startup_name', None)

        startups = FollowTable.objects.filter(investor=investor_id).values_list('startup', flat=True)
        startups_founders = Founder.objects.filter(startup__in=startups).values_list('id', flat=True)

        if (sort_by is not None) and (start_date is not None) and (end_date is not None) and (startup_name is not None):
            return Entry.objects.all().filter(founder__in=startups_founders, date__range=[start_date, end_date], founder__startup__name__icontains=startup_name).order_by(sort_by)
        elif (sort_by is not None) and (startup_name is not None):    
            return Entry.objects.all().filter(founder__in=startups_founders, founder__startup__name__icontains=startup_name).order_by(sort_by)
        elif (sort_by is not None):
            return Entry.objects.all().filter(founder__in=startups_founders).order_by(sort_by)

        return Entry.objects.filter(founder__in=startups_founders)