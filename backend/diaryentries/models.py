from django.db import models
from django.utils import timezone
from authentication.models import Founder

# Create your models here.

class Entry(models.Model):
    sales = models.PositiveIntegerField(default=0)
    revenue = models.PositiveIntegerField(default=0)
    user = models.PositiveIntegerField(default=0)
    lessonLearned = models.TextField()
    founder = models.ForeignKey(Founder, related_name="entries", on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(auto_now_add=True)