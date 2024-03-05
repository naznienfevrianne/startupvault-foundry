from django.shortcuts import render
from diaryentries.models import Entry
from .serializers import MetricSerializer
from rest_framework import generics
from rest_framework.response import Response
from datetime import datetime, timedelta
from django.utils import timezone


class MetricsRetrieve(generics.RetrieveUpdateDestroyAPIView):
    queryset = Entry.objects.all()
    serializer_class = MetricSerializer

    def get(self, request, *args, **kwargs): #only accepting argument self
        instance = self.get_object()

        date = instance.date #tanggal entry
        today = timezone.now().date() #tanggal hari ini

        start_of_week = today - timedelta(days=today.weekday()) #Today minus integer weekday hari ini (Mon=0, Sunday=6)
        end_of_week = start_of_week + timedelta(days=6)

        data = self.get_serializer(instance).data

        if (start_of_week <= date <= end_of_week):
            data['date_within_week'] = date
            return Response(data)            
        else:
            return Response("No content available this week")
    
    

        




