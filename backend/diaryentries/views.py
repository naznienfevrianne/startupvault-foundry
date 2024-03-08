from rest_framework import generics
from .models import Founder, Entry
from .serializers import FounderEntrySerializer, EntrySerializer
from rest_framework.permissions import AllowAny

# Read & Create Diary Entry by Founder
class DiaryEntriesListCreate(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
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
    permission_classes = [AllowAny]
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer

# Read & Create Diary Entry by Founder
class DiaryEntryFilterList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = FounderEntrySerializer

    # Read
    def get_queryset(self):
        queryset = YourModel.objects.all()
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)

        return Entry.objects.all().filter(date_field__range=[start_date, end_date]).order_by("-date")
