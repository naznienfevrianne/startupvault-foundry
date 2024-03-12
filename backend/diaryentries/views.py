from django.shortcuts import render
from diaryentries.models import Founder, Entry
from .serializers import MetricSerializer, FounderEntrySerializer, EntrySerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
from django.utils import timezone
from authentication.views import JWTAuthentication


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
            return Entry.objects.all().filter(date__range=[start_date, end_date]).order_by(sort_by)
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

