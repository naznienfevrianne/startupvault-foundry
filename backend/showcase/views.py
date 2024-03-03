from django.shortcuts import render

# Create your views here.
from .serializers import ShowcasePostSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ShowcasePost, Like
from backend.authentication.models import UserModel #blom ambil dari branch shafa

class ShowcasePostList(APIView):
    def get(self, request, format=None):
        posts = ShowcasePost.objects.all()
        serializer = ShowcasePostSerializer(posts, many=True)
        return Response(serializer.data)

class ToggleLikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        post_id = request.data.get('showcase_post_id')
        user = get_object_or_404(UserModel, id=user_id, role__in=['investor', 'partner', 'founder'])

        if request.user != user:
            return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        post = get_object_or_404(ShowcasePost, id=post_id)
        like, created = Like.objects.get_or_create(user=user, showcase_post=post)

        if created:
            return Response({"message": "Liked successfully"}, status=status.HTTP_201_CREATED)
        else:
            like.delete()
            return Response({"message": "Unliked successfully"}, status=status.HTTP_200_OK)

