from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class UserModel(models.Model):
    email = models.EmailField()
    role = models.CharField(max_length=10)
    password = models.CharField(max_length=12)
    isVerified = models.BooleanField()
    image = models.TextField()
    linkedin = models.URLField()
    name = models.CharField(max_length = 255)
    
class Startup(models.Model):
    typ = models.CharField(max_length=10)
    image = models.TextField()
    name = models.CharField(max_length=255)
    location = models.TextField()
    sector = models.TextField(blank=True)
    desc = models.TextField()
    pitchdeck = models.TextField()
    revenue = models.IntegerField()
    support = models.TextField()
    website = models.URLField()
    linkedin = models.TextField()

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
    website = models.URLField()
        
class Partner(UserModel):
    location = models.TextField()
    desc = models.TextField()
    interest = models.TextField()
    website = models.URLField()
    
