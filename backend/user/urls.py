# example/urls.py
from django.urls import path

from .views import UserListCreate, UserRetrieveUpdateDestroy


urlpatterns = [
    path('user/', UserListCreate.as_view(), name="user-list-create"),
    path('user/<int:pk>', UserRetrieveUpdateDestroy.as_view(), name='user-retrieve-update-destroy')
]