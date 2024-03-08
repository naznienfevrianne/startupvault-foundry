from django.urls import path
from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate#, DiaryEntryListSort

urlpatterns = [
    path('diaryEntries/founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('diaryEntries/<int:pk>', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
]
