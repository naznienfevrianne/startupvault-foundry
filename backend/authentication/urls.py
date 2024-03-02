# example/urls.py
from django.urls import path

from .views import UserModelListCreate, PartnerListCreate, InvestorListCreate, StartupListCreate, FounderListCreate

urlpatterns = [
    path('user/', UserModelListCreate.as_view(), name="user-list-create"),
    path('founder/', FounderListCreate.as_view(), name="founder-list-create"),
    path('investor/', InvestorListCreate.as_view(), name="investor-list-create"),
    path("startup/", StartupListCreate.as_view(), name="startup-list-create"),
    path("partner/", PartnerListCreate.as_view(), name="partner-list-create")
]