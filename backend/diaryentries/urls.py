from django.urls import path
from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate, MetricsRetrieve, DiaryEntriesListRead

urlpatterns = [
    path('diaryEntries/founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
     path('diaryEntriesRead/founder/<int:founder>', DiaryEntriesListRead.as_view(), name='diary-entry-list-read'),
    path('diaryEntries/<int:pk>', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
    path('<int:founder>/', MetricsRetrieve.as_view(), name='retrieve-metrics')
]
