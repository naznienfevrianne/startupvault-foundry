from django.urls import path

from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate, MetricsRetrieve, DiaryEntriesListRead, DiaryEntriesListRead, FollowedFounderDiaryEntriesList, \
    ToggleFollowView, TotalFollowersView, CheckFollowView, FollowingList

urlpatterns = [
    path('diaryEntries/founder/<int:founder>/', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('diaryEntriesRead/founder/<int:founder>', DiaryEntriesListRead.as_view(), name='diary-entry-list-read'),
    path('diaryEntriesRead/founder/<int:founder>', DiaryEntriesListRead.as_view(), name='diary-entry-list-read'),
    path('diaryEntries/<int:pk>/', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
    path('<int:founder>/', MetricsRetrieve.as_view(), name='retrieve-metrics'),
    path('diaryEntries/investor/<int:investor>', FollowedFounderDiaryEntriesList.as_view(), name='followed-entry-list'),
    path('following/<int:investor>', FollowingList.as_view(), name='following-list'),
    path('diaryEntries/investor/<int:investor>/', FollowedFounderDiaryEntriesList.as_view(), name='followed-entry-list'),
    path('follow/', ToggleFollowView.as_view(), name='toggle-follow'),
    path('total_followers/<int:startup_id>/', TotalFollowersView.as_view(), name='total-followers'),
    path('check_follow/', CheckFollowView.as_view(), name='check-follow'),
]
