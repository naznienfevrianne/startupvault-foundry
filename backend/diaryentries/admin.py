from django.contrib import admin
from .models import Entry, FollowTable

# Register your models here.
admin.site.register(Entry)
admin.site.register(FollowTable)