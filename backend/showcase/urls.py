from django.urls import path
from .views import ShowcasePostList, ToggleLikePost

urlpatterns = [
    path('showcase/', ShowcasePostList.as_view(), name='showcase-list'),
    path('showcase/toggle-like/', ToggleLikePost.as_view(), name='toggle-like-post'),
]