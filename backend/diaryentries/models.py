from django.db import models
from authentication.models import Founder, Startup, Investor

# Create your models here.
class Entry(models.Model):
    sales = models.PositiveIntegerField()
    revenue = models.PositiveIntegerField()
    user = models.PositiveIntegerField()
    lessonLearned = models.TextField(max_length=1000)
    date = models.DateField(auto_now_add=True)
    founder = models.ForeignKey(Founder, related_name="entries", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.founder.name} [{self.date}]"

class FollowTable(models.Model):
    startup = models.ForeignKey(Startup, related_name="followed", on_delete=models.CASCADE)
    investor = models.ForeignKey(Investor, related_name="following", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.investor.name} follow {self.startup.name}"


