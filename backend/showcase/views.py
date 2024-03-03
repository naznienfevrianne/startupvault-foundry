from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ShowcasePostSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import ShowcasePost, Like

class ShowcasePostList(ListAPIView):
    queryset = ShowcasePost.objects.all()
    serializer_class = ShowcasePostSerializer

class ToggleLikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('showcase_post_id')
        post = get_object_or_404(ShowcasePost, id=post_id)

        like, created = Like.objects.get_or_create(user=request.user, showcase_post=post)

        if created:
            message = "Liked successfully"
        else:
            like.delete()
            message = "Unliked successfully"

        return Response({"message": message}, status=status.HTTP_200_OK)

