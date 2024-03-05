from django.db import models

# Create your models here.
class Verification(models.Model):
    status = models.TextField()