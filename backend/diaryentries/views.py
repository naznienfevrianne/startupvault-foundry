from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView

from .models import Founder, Entry, FollowTable, Startup
from .serializers import MetricSerializer, FounderEntrySerializer, EntrySerializer, FollowedFounderEntrySerializer, FollowTableSer
from rest_framework import generics, filters, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework.response import Response
from authentication.views import JWTAuthentication
import django_filters
from authentication.models import UserModel
from authentication.models import Investor


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

# Read Diary Entry by Investor
class DiaryEntriesListRead(generics.ListCreateAPIView):
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

# Read Diary Entry by Followed Founder
# class FollowedFounderDiaryEntriesList(generics.ListAPIView):
#     permission_classes = [AllowAny]
#     serializer_class = FollowedFounderEntrySerializer

#     # Read
#     def get_queryset(self):
#         sort_by = self.request.query_params.get("sort", None)
#         investor_id = self.kwargs["investor"]

#         start_date = self.request.query_params.get('startDate', None)
#         end_date = self.request.query_params.get('endDate', None)
#         startup_name = self.request.query_params.get('startup_name', None)
        
#         startups = FollowTable.objects.filter(investor=investor_id).values_list('startup', flat=True)
#         startups_founders = Founder.objects.filter(startup__in=startups).values_list('id', flat=True)

#         if (start_date is not None) and (end_date is not None) and (startup_name is not None):
#             startup_name_list = startup_name.split(",")
#             return Entry.objects.all().filter(founder__in=startups_founders, date__range=[start_date, end_date], founder__startup__name__in=startup_name_list).order_by(sort_by)
#         elif (start_date is not None) and (end_date is not None):    
#             return Entry.objects.all().filter(founder__in=startups_founders, date__range=[start_date, end_date]).order_by(sort_by)
#         elif (startup_name is not None):
#             startup_name_list = startup_name.split(",")
#             return Entry.objects.all().filter(founder__in=startups_founders, founder__startup__name__in=startup_name_list).order_by(sort_by)
#         else:
#             return Entry.objects.filter(founder__in=startups_founders).order_by(sort_by)

class FollowedFounderDiaryEntriesList(generics.ListAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = FollowedFounderEntrySerializer

    def get_queryset(self):
        sort_by = self.request.query_params.get("sort", "-date")
        investor_id = self.kwargs["investor"]

        start_date = self.request.query_params.get('startDate', None)
        end_date = self.request.query_params.get('endDate', None)
        startup_name = self.request.query_params.get('startup_name', None)
        
        startups = FollowTable.objects.filter(investor=investor_id).values_list('startup', flat=True)
        startups_founders = Founder.objects.filter(startup__in=startups).values_list('id', flat=True)

        queryset = Entry.objects.filter(founder__in=startups_founders)
        
        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])
        
        if startup_name:
            startup_name_list = startup_name.split(",")
            queryset = queryset.filter(founder__startup__name__in=startup_name_list)
        
        return queryset.order_by(sort_by)
    

class FollowingList(generics.ListAPIView):
    permission_classes = [JWTAuthentication]
    serializer_class = FollowTableSer
    
    # Read
    def get_queryset(self):
        investorId = self.kwargs["investor"]

        return FollowTable.objects.filter(investor_id=investorId)
class ToggleFollowView(APIView):
    permission_classes = [JWTAuthentication]

    def get_serializer_class(self):
        # Workaround to satisfy DRF requirements without using a serializer
        return None

    def post(self, request, *args, **kwargs):
        startup_id = request.data.get('startup')
        investor_id = request.data.get('investor')

        print("Received startup_id:", request.data.get('startup'))  # Debugging line
        print("Received investor_id:", request.data.get('investor'))  # Debugging line
        # The rest of your method...

        startup = get_object_or_404(Startup, id=startup_id)
        investor = get_object_or_404(Investor, id=investor_id)

        if FollowTable.objects.filter(startup=startup, investor=investor).exists():
            # Unfollow
            follow = FollowTable.objects.get(startup=startup, investor=investor)
            follow.delete()
            action = 'Unfollowed'
        else:
            # Follow
            FollowTable.objects.create(startup=startup, investor=investor)
            action = 'Followed'

        total_followers = FollowTable.objects.filter(startup_id=startup_id).count()

        return Response({'message': f'{action} the startup.', 'follow_status': action, 'total_followers': total_followers}, status=status.HTTP_200_OK)
class TotalFollowersView(APIView):
    permission_classes = [JWTAuthentication]
    def get(self, request, startup_id):
        total_followers = FollowTable.objects.filter(startup_id=startup_id).count()
        return Response({'total_followers': total_followers})

class CheckFollowView(APIView):
    permission_classes = [JWTAuthentication]

    def get(self, request):
        startup_id = request.query_params.get('startup_id')
        investor_id = request.query_params.get('investor_id')

        if not startup_id or not investor_id:
            return Response({'error': 'Startup ID and Investor ID are required'}, status=400)

        # Assuming startup_id and investor_id are valid and exist
        is_following = FollowTable.objects.filter(startup_id=startup_id, investor_id=investor_id).exists()

        return Response({'is_following': is_following})
