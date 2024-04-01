from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserModel)
admin.site.register(Startup)
admin.site.register(Founder)
admin.site.register(Investor)
admin.site.register(Partner)