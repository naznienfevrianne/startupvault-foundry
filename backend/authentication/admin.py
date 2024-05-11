from django.contrib import admin
from .models import *
from django import forms

# Register your models here.
admin.site.register(UserModel)
admin.site.register(Founder)
admin.site.register(Investor)
admin.site.register(Partner)

class StartupAdmin(admin.ModelAdmin):
    search_fields = ['name']

admin.site.register(Startup, StartupAdmin)

class Top10StartupAdmin(admin.ModelAdmin):
    raw_id_fields = (
        "rank1",
        "rank2",
        "rank3",
        "rank4",
        "rank5",
        "rank6",
        "rank7",
        "rank8",
        "rank9",
        "rank10",
    )
    # autocomplete_fields = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5','rank6', 'rank7','rank8', 'rank9', 'rank10']

admin.site.register(Top10Startup, Top10StartupAdmin)
