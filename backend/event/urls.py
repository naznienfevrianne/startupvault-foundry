from django.urls import path
from .views import *

urlpatterns = [
    path('', EventListCreate.as_view(), name="event-list-create"),
    path('<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name="event-detail")
]
