from django.urls import path
from .views import MetricsRetrieve

urlpatterns = [
    path('<int:pk>/', MetricsRetrieve.as_view(), name='retrieve-metrics')
]