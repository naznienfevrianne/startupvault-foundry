from django.urls import path
from .views import DiaryEntriesListCreate, DiaryEntriesRetrieveUpdate

urlpatterns = [
    path('founder/<int:founder>', DiaryEntriesListCreate.as_view(), name='diary-entry-list'),
    path('<int:pk>', DiaryEntriesRetrieveUpdate.as_view(), name='diary-entry-update'),
]
