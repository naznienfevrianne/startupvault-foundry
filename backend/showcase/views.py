from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db import transaction
from django.shortcuts import get_object_or_404
from .models import ShowcasePost, Like, PostImage
from .serializers import ShowcasePostSerializer
from .forms import ShowcasePostForm, PostImageForm

class ShowcaseView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        posts = ShowcasePost.objects.all()
        serializer = ShowcasePostSerializer(posts, many=True)
        return Response(serializer.data)

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        if 'showcase_post_id' in request.data:
            # Handle like functionality
            return self.toggle_like(request)
        else:
            # Handle post creation
            return self.create_post(request)

    def create_post(self, request):
        post_form = ShowcasePostForm(request.data)
        image_form = PostImageForm(request.data, request.FILES)

        if post_form.is_valid() and image_form.is_valid():
            showcase_post = post_form.save(commit=False)
            showcase_post.user = request.user
            showcase_post.save()

            for image_data in request.FILES.getlist('image'):
                PostImage.objects.create(post=showcase_post, image=image_data)

            serializer = ShowcasePostSerializer(showcase_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = {
                'post_errors': post_form.errors,
                'image_errors': image_form.errors,
            }
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)

    def toggle_like(self, request):
        post_id = request.data.get('showcase_post_id')
        post = get_object_or_404(ShowcasePost, id=post_id)

        like, created = Like.objects.get_or_create(user=request.user, showcase_post=post)

        if created:
            message = "Liked successfully"
        else:
            like.delete()
            message = "Unliked successfully"

        return Response({"message": message}, status=status.HTTP_200_OK)


# from django.shortcuts import render
# from rest_framework.generics import ListAPIView
#
# from .forms import ShowcasePostForm, PostImageForm
# from .serializers import ShowcasePostSerializer
# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from .models import ShowcasePost, Like, PostImage
#
#
# class CreateShowcasePost(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request, *args, **kwargs):
#         post_form = ShowcasePostForm(request.data)
#         image_form = PostImageForm(request.data, request.FILES)
#
#         if post_form.is_valid() and image_form.is_valid():
#             showcase_post = post_form.save(commit=False)
#             showcase_post.user = request.user
#             showcase_post.save()
#
#             for image_data in request.FILES.getlist('image'):
#                 PostImage.objects.create(post=showcase_post, image=image_data)
#
#             serializer = ShowcasePostSerializer(showcase_post)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(post_form.errors, status=status.HTTP_400_BAD_REQUEST)
#
# class ShowcasePostList(ListAPIView):
#     queryset = ShowcasePost.objects.all()
#     serializer_class = ShowcasePostSerializer
#
# class ToggleLikePost(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request, *args, **kwargs):
#         post_id = request.data.get('showcase_post_id')
#         post = get_object_or_404(ShowcasePost, id=post_id)
#
#         like, created = Like.objects.get_or_create(user=request.user, showcase_post=post)
#
#         if created:
#             message = "Liked successfully"
#         else:
#             like.delete()
#             message = "Unliked successfully"
#
#         return Response({"message": message}, status=status.HTTP_200_OK)
#
#
#
