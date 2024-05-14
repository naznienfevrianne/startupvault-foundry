from rest_framework.generics import ListAPIView, CreateAPIView, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.db import transaction
from .models import ShowcasePost, Like, PostImage
from .serializers import ShowcasePostSerializer
from .forms import ShowcasePostForm, PostImageForm
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from authentication.views import JWTAuthentication
from authentication.models import UserModel


class ShowcaseListView(ListAPIView):
    queryset = ShowcasePost.objects.order_by('-date')
    serializer_class = ShowcasePostSerializer
    permission_classes = [AllowAny]

class CreateShowcaseView(generics.ListCreateAPIView):
    queryset = ShowcasePost.objects.all()
    serializer_class = ShowcasePostSerializer
    permission_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        post_form = ShowcasePostForm(request.data)
        image_form = PostImageForm(request.data, request.FILES) if request.FILES else None

        if post_form.is_valid() and (image_form is None or image_form.is_valid()):
            showcase_post = post_form.save(commit=False)
            user_id = request.data.get('user')
            showcase_post.user_id = user_id  # Assuming `user_id` is a valid user ID
            showcase_post.save()

            images_urls = request.data.get('image', [])
            for url in images_urls:
                PostImage.objects.create(post=showcase_post, image=url)

            serializer = ShowcasePostSerializer(showcase_post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errors = {
                'post_errors': post_form.errors,
                'image_errors': image_form.errors if image_form else {},
            }
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class ToggleLikeView(generics.GenericAPIView):
    permission_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        user_id = request.data.get('user')

        post = get_object_or_404(ShowcasePost, id=post_id)
        user = get_object_or_404(UserModel, id=user_id)

        if post.likes.filter(user=user).exists():
            success = post.unlike(user)
            action = 'Like removed'
        else:
            success = post.add_like(user)
            action = 'Like added'

        if success:
            return Response({'message': action, 'likesCount': post.like_count}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Action failed'}, status=status.HTTP_400_BAD_REQUEST)

class ShowcasePartnerList(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ShowcasePostSerializer

    # Read
    def get_queryset(self):
        partnerId = self.kwargs["partner"]
        search_query = self.request.query_params.get("search", None)
        sort_by = self.request.query_params.get("sort", None)

        if(search_query is not None and sort_by is not None):
            return ShowcasePost.objects.filter(user_id=partnerId, content__icontains=search_query).order_by(sort_by)
        elif(search_query is not None):
            return ShowcasePost.objects.filter(user_id=partnerId, content__icontains=search_query).order_by(sort_by)
        elif(sort_by is not None):
            return ShowcasePost.objects.filter(user_id=partnerId).order_by(sort_by)

        return ShowcasePost.objects.filter(user_id=partnerId).order_by('-date')