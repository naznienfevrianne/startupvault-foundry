from django.db import models
from authentication.models import Partner

# Create your models here.
class Event (models.Model):
    name = models.CharField(max_length = 255)
    summary = models.CharField(max_length = 250)
    desc = models.TextField(max_length=1000)
    location = models.TextField()
    date = models.DateField()
    price = models.IntegerField()
    link = models.TextField()
    image = models.TextField()
    isVerified = models.IntegerField()
    rejectionNote = models.CharField(max_length = 255, blank=True, default="")
    partner = models.ForeignKey(Partner, related_name="partner", on_delete=models.CASCADE)