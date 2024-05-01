from django.contrib import admin
from .models import Event

# Register your models here.
admin.site.register(Event)

class EventAdmin(admin.ModelAdmin):
    search_fields = ['name']