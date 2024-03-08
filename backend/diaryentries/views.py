from django.shortcuts import render
from diaryentries.models import Entry
from .serializers import MetricSerializer, FounderEntrySerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
from django.utils import timezone

# Read & Create Diary Entry by Founder
class DiaryEntriesListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = FounderEntrySerializer

    # Read
    def get_queryset(self):
        sort_by = self.request.query_params.get("sort", "")
        founderId = self.kwargs["founder"]
        if sort_by:
            return Entry.objects.all().filter(founder=founderId).order_by(sort_by)
        return Entry.objects.filter(founder=founderId)

class MetricsRetrieve(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
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
        obj = queryset.last() if queryset else None
        return obj
        




