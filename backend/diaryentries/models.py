from django.db import models
from django.utils import timezone

# Create your models here.
class Founder(models.Model):
    name = models.CharField(max_length=255)
    
class Entry(models.Model):
    sales = models.PositiveIntegerField(default=0)
    revenue = models.PositiveIntegerField(default=0)
    user = models.PositiveIntegerField(default=0)
    lessonLearned = models.TextField()
    # startup = models.ForeignKey()
    # founder = models.ForeignKey()
    date = models.DateField(auto_now_add=True)