from django.urls import path
from .views import *

urlpatterns = [
    path('', EventListCreate.as_view(), name="event-list-create"),
    path('<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name="event-detail"),
    path('create/', create_event, name='create_event'),
    path('created-events/<int:partner_id>/', EventsByPartnerView.as_view(), name='events-by-partner'),
]
