from django.urls import path
from .views import *

urlpatterns = [
    path('<int:pk>/', EventDetailsRetrieveUpdateDestroy.as_view(), name='event-details'),
]
