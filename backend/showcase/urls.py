from django.urls import path
from .views import ShowcasePostList, ToggleLikePost

urlpatterns = [
    path('', ShowcasePostList.as_view(), name='showcase-list'),
    path('toggle-like/', ToggleLikePost.as_view(), name='toggle-like-post'),
]