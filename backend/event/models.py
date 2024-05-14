from django.db import models
from authentication.models import Partner

# Create your models here.
class Event (models.Model):
    name = models.TextField()
    summary = models.TextField()
    desc = models.TextField()
    location = models.TextField()
    date = models.DateField()
    price = models.IntegerField()
    link = models.TextField()
    image = models.TextField()
    isVerified = models.IntegerField()
    rejectionNote = models.TextField(blank=True, default="")
    partner = models.ForeignKey(Partner, related_name="partner", on_delete=models.CASCADE)
    
    def __str__(self):
        if (self.isVerified == 0):
            return f"[Need to be verified]: {self.name}"
        elif (self.isVerified == 1):
            return f"[Accepted]: {self.name}"
        else:
            return f"[Rejected]: {self.name}"