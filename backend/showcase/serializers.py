from rest_framework import serializers
from .models import ShowcasePost, PostImage

class ShowcasePostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.name')
    user_id = serializers.ReadOnlyField(source='user.id')
    user_avatar = serializers.ReadOnlyField(source='user.image')
    likes = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = ShowcasePost
        fields = ['id', 'user', 'user_id', 'user_avatar', 'content', 'image', 'likes', 'date']

    def get_likes(self, obj):
        return obj.like_count

    def get_image(self, obj):
        images = obj.images.all()
        return [image.image for image in images] if images.exists() else []
