from django.urls import path
from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate, MetricsRetrieve

urlpatterns = [
    path('diaryEntries/founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('diaryEntries/<int:pk>', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
    path('<int:founder>/', MetricsRetrieve.as_view(), name='retrieve-metrics')
]
