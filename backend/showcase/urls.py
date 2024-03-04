from django.urls import path
from .views import ShowcaseView

urlpatterns = [
    path('', ShowcaseView.as_view(), name='showcase-list'),
    path('create_post/', ShowcaseView.create_post, name='create_post'),
]