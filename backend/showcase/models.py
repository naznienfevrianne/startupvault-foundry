from django.db import models
from django.utils import timezone
from backend.user.models import User

class ShowcasePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='showcase_posts')
    content = models.TextField(blank=False, null=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user.username} on {self.date}"

    @property
    def like_count(self):
        return self.likes.count()

    def add_like(self, user):
        if not self.likes.filter(user=user).exists():
            Like.objects.create(showcase_post=self, user=user, date=timezone.now())
            return True #biar gampang nanti buat notif
        return False

    def unlike(self, user):
        like = self.likes.filter(user=user)
        if like.exists():
            like.delete()
            return True
        return False

class PostImage(models.Model):
    post = models.ForeignKey(ShowcasePost, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='showcase_images/')

    def __str__(self):
        return f"Image for post {self.post.id}"

class Like(models.Model):
    showcase_post = models.ForeignKey(ShowcasePost, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='liked_posts')
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('showcase_post', 'user')

    def __str__(self):
        return f"Like by {self.user.username} for post {self.showcase_post.id} on {self.date}"
