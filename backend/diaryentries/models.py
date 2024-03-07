from django.db import models
from authentication.models import Founder

# Create your models here.
class Entry(models.Model):
    sales = models.PositiveIntegerField()
    revenue = models.PositiveIntegerField()
    user = models.PositiveIntegerField()
    lessonLearned = models.TextField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    founder = models.ForeignKey(Founder, related_name="entries", on_delete=models.CASCADE)