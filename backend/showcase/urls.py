from django.urls import path
from .views import ShowcaseListView, CreateShowcaseView, ToggleLikeView, ShowcasePartnerList

urlpatterns = [
    path('', ShowcaseListView.as_view(), name='showcase-list'),
    path('create_post/', CreateShowcaseView.as_view(), name='create-showcase'),
    path('toggle_like/', ToggleLikeView.as_view(), name='toggle-like'),
    path('<int:partner>/', ShowcasePartnerList.as_view(), name='showcase-partner-list'),
]
