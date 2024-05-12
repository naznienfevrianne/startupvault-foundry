from django.db import models

# Create your models here.
from django.db import models
import jwt


class UserModel(models.Model):
    email = models.EmailField(unique=True) # awal
    role = models.CharField(max_length=10) # milih di awal
    password = models.CharField(max_length=255) # awal
    isVerified = models.IntegerField() # in backend
    image = models.TextField() # profile picture
    name = models.CharField(max_length = 255)
    linkedin = models.URLField()
    phoneNumber = models.CharField(max_length=16, default="")
    rejectionNote = models.CharField(max_length = 255, blank=True, default="")

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
        if (self.founder.isVerified == 0):
            return f"[Need to be verified]: {self.id} {self.name}"
        elif (self.founder.isVerified == 1):
            return f"[Accepted]: {self.id} {self.name}"
        else:
            return f"[Rejected]: {self.id} {self.name}"

class InvestorOrganization(models.Model):
    typ = models.CharField(max_length=10) # dr sblmnya
    logo = models.TextField(default="")
    name = models.CharField(max_length=255, default="")
    location = models.TextField()
    desc = models.TextField()
    sector = models.TextField()
    ticket = models.IntegerField()
    stage=models.TextField()
    support=models.TextField()
    website = models.TextField()
    linkedin = models.TextField(default="")
    
    def __str__(self):
        return self.name
    
class PartnerOrganization(models.Model):
    logo = models.TextField(default="")
    name = models.CharField(max_length=255, default="")
    location = models.TextField()
    desc = models.TextField()
    interest = models.TextField()
    website = models.TextField()
    linkedin = models.TextField(default="")
    mou = models.TextField(default="")

    def __str__(self):
        return self.name

class Founder(UserModel):
    startup = models.OneToOneField(Startup, on_delete=models.CASCADE, related_name='founder', default="")


class Investor(UserModel):
    investorOrganization = models.OneToOneField(InvestorOrganization, on_delete=models.CASCADE, related_name='investor', default="")

class Partner(UserModel):
    partnerOrganization = models.OneToOneField(PartnerOrganization, on_delete=models.CASCADE, related_name='partner', default="")

class Top10Startup(models.Model):
    rank1 = models.TextField()
    rank2 = models.TextField()
    rank3 = models.TextField()
    rank4 = models.TextField()
    rank5 = models.TextField()
    rank6 = models.TextField()
    rank7 = models.TextField()
    rank8 = models.TextField()
    rank9 = models.TextField()
    rank10 = models.TextField()

    def save(self, *args, **kwargs):
        startup_ranks = [self.rank1, self.rank2, self.rank3, self.rank4, self.rank5, self.rank6, self.rank7, self.rank8, self.rank9, self.rank10]
        if len(startup_ranks) != len(set(startup_ranks)): # check is the len of startup_ranks equal to set startup_ranks
            raise ValueError("Duplicate startups are not allowed in the ranks.")
        
        super().save(*args, **kwargs)