from django.urls import path
# from rest_framework_simplejwt import views as jwt_views

from .views import (
    InvestorRetrieveUpdateDestroy,
    TopStartupRetriever,
    UserModelListCreate, 
    PartnerListCreate, 
    InvestorListCreate, 
    StartupListCreate, 
    FounderListCreate,
    FounderRetrieveUpdateDestroy,  
    StartupRetrieveUpdateDestroy,
    PartnerOrganizationListCreate,
    InvestorOrganizationListCreate,
    PartnerOrganizationRetrieveUpdateDestroy,
    InvestorOrganizationRetrieveUpdateDestroy,
    login, 
    check_email,
    test_token
)


urlpatterns = [
    path('user/', UserModelListCreate.as_view(), name="user-list-create"),
    path('founder/', FounderListCreate.as_view(), name="founder-list-create"),
    path('founder/<int:pk>/', FounderRetrieveUpdateDestroy.as_view(), name="founder-detail"),
    path('investor/', InvestorListCreate.as_view(), name="investor-list-create"),
    path('investor/<int:pk>/', InvestorRetrieveUpdateDestroy.as_view(), name="investor-detail"),
    path("startup/", StartupListCreate.as_view(), name="startup-list-create"),
    path('startup/<int:pk>/', StartupRetrieveUpdateDestroy.as_view(), name="startup-detail"), 
    path("partner/", PartnerListCreate.as_view(), name="partner-list-create"),
    path("partnerorg/", PartnerOrganizationListCreate.as_view(), name="partner-organization-list-create"),
    path("partnerorg/<int:pk>", PartnerOrganizationRetrieveUpdateDestroy.as_view(), name="partner-organization-detail"),
    path("investororg/", InvestorOrganizationListCreate.as_view(), name="investor-organization-list-create"),
    path("investororg/<int:pk>", InvestorOrganizationRetrieveUpdateDestroy.as_view(), name="investor-organization-detail"),
    path("startup/top10", TopStartupRetriever.as_view(), name="top-startup-retriever"),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("login/",login, name="login"),
    path("checkEmail/", check_email, name="check-email"),
    path("testToken/", test_token, name="test-token"),

]