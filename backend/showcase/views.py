from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.db import transaction
from django.shortcuts import get_object_or_404
from .models import ShowcasePost, Like, PostImage
from .serializers import ShowcasePostSerializer
from .forms import ShowcasePostForm, PostImageForm

class ShowcaseView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = ShowcasePost.objects.all()

    def get_queryset(self):
        """
        Optionally, this method can contain logic to filter or adjust
        the queryset based on the request.
        """
        return self.queryset.all()

    def get(self, request, *args, **kwargs):
        posts = self.get_queryset()  # This ensures fresh data for each request.
        serializer = ShowcasePostSerializer(posts, many=True)
        return Response(serializer.data)

    @transaction.atomic
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        permission_classes = [IsAuthenticated]
        if 'showcase_post_id' in request.data:
            # Handle like functionality
            return self.toggle_like(request)
        else:
            # Handle post creation
            return self.create_post(request)

    @csrf_exempt
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

    @api_view(['POST'])
    @csrf_exempt
    def toggle_like(request, post_id):
        post = get_object_or_404(ShowcasePost, id=post_id)
        user = request.user  # Ensure you have a way to identify the requesting user

        # Use the model methods for adding or removing a like
        if post.likes.filter(user=user).exists():
            unliked = post.unlike(user)
            message = "Unliked successfully" if unliked else "Error in unliking"
        else:
            liked = post.add_like(user)
            message = "Liked successfully" if liked else "User has already liked"

        # Directly use the like_count property from the ShowcasePost model
        likes_count = post.like_count

        return JsonResponse({
            "message": message,
            "isLiked": not post.likes.filter(user=user).exists(),
            "likesCount": likes_count
        }, status=status.HTTP_200_OK)

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
