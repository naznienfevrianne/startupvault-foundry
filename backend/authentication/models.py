from django.db import models

# Create your models here.
from django.db import models
import jwt


class UserModel(models.Model):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10)
    password = models.CharField(max_length=255)
    isVerified = models.IntegerField()
    image = models.TextField()
    linkedin = models.URLField()
    name = models.CharField(max_length = 255)
    rejectionNote = models.CharField(max_length = 255, null=True, blank=True)

    def __str__(self):
        if (self.isVerified == 0):
            return f"[Need to be verified]: {self.email}"
        elif (self.isVerified == 1):
            return f"[Accepted]: {self.email}"
        else:
            return f"[Rejected]: {self.email}"


class Startup(models.Model):
    typ = models.CharField(max_length=10)
    image = models.TextField()
    name = models.CharField(max_length=255)
    location = models.TextField()
    sector = models.TextField(blank=True)
    desc = models.TextField()
    pitchdeck = models.TextField(null=True)
    revenue = models.IntegerField()
    support = models.TextField()
    website = models.TextField()
    linkedin = models.TextField()

    def __str__(self):
        return self.name

class Founder(UserModel):
    phoneNumber = models.CharField(max_length=12)
    startup = models.OneToOneField(Startup, on_delete=models.CASCADE, related_name='founder')


class Investor(UserModel):
    typ = models.CharField(max_length=10)
    location = models.TextField()
    desc = models.TextField()
    sector = models.TextField()
    ticket = models.IntegerField()
    stage=models.TextField()
    support=models.TextField()
    website = models.TextField()


class Partner(UserModel):
    location = models.TextField()
    desc = models.TextField()
    interest = models.TextField()
    website = models.TextField()
    mou = models.TextField(default="")

    
