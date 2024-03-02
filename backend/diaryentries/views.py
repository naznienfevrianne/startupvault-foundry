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
        founderId = self.kwargs['founder']
        return Entry.objects.filter(founder=founderId)

    # Create
    def perform_create(self, serializer):
        founderId = self.kwargs['founder']
        founder = Founder.objects.get(pk=founderId)
        serializer.save(founder=founder)  

# Read & Update Diary Entry by Id
class DiaryEntriesRetrieveUpdate(generics.RetrieveUpdateAPIView):
    permission_classes = [AllowAny]
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
