from django.urls import path
from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate, MetricsRetrieve, FollowedFounderDiaryEntriesList, FollowingList

urlpatterns = [
    path('diaryEntries/founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('diaryEntries/<int:pk>', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
    path('<int:founder>/', MetricsRetrieve.as_view(), name='retrieve-metrics'),
    path('diaryEntries/investor/<int:investor>', FollowedFounderDiaryEntriesList.as_view(), name='followed-entry-list'),
    path('following/<int:investor>', FollowingList.as_view(), name='following-list'),
]
