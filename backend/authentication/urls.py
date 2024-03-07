# example/urls.py
from django.urls import path
# from rest_framework_simplejwt import views as jwt_views

from .views import (
    UserModelListCreate, 
    PartnerListCreate, 
    InvestorListCreate, 
    StartupListCreate, 
    FounderListCreate,
    FounderRetrieveUpdateDestroy,  
    StartupRetrieveUpdateDestroy,
    login, 
    check_email
)


urlpatterns = [
    path('user/', UserModelListCreate.as_view(), name="user-list-create"),
    path('founder/', FounderListCreate.as_view(), name="founder-list-create"),
    path('founder/<int:pk>/', FounderRetrieveUpdateDestroy.as_view(), name="founder-detail"),
    path('investor/', InvestorListCreate.as_view(), name="investor-list-create"),
    path("startup/", StartupListCreate.as_view(), name="startup-list-create"),
    path('startup/<int:pk>/', StartupRetrieveUpdateDestroy.as_view(), name="startup-detail"), 
    path("partner/", PartnerListCreate.as_view(), name="partner-list-create"),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("login/",login, name="login"),
    path("checkEmail/", check_email, name="check-email")
]