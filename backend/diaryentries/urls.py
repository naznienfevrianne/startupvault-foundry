from django.urls import path
from .views import MetricsRetrieve, DiaryEntriesListCreate

urlpatterns = [
    path('diaryEntries/founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('<int:founder>/', MetricsRetrieve.as_view(), name='retrieve-metrics')
]