from rest_framework import serializers
from .models import ShowcasePost, PostImage

class ShowcasePostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.name')
    likes = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = ShowcasePost
        fields = ['user', 'content', 'image', 'likes', 'date']

    def get_likes(self, obj):
        return obj.like_count

    def get_image(self, obj):
        images = obj.images.all()
        if images.exists():
            # Assuming you're storing full URL paths in your ImageField
            return images.first().image.url
        return None
