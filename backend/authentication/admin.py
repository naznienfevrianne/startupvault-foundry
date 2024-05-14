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

class Top10Form(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        for field_name in ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8', 'rank9', 'rank10']:
            self.fields[field_name].queryset = Startup.objects.filter(founder__isVerified=1)
            self.fields[field_name].widget = forms.Select(choices=self.get_startup_id_name_choices())

    def get_startup_id_name_choices(self):
        startups = Startup.objects.filter(founder__isVerified=1).values_list('id', 'name')
        choices = [(startup[0], startup[1]) for startup in startups]
        return choices

    class Meta:
        model = Top10Startup
        fields = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8', 'rank9', 'rank10']

class Top10Admin(admin.ModelAdmin):
    form = Top10Form

admin.site.register(Top10Startup, Top10Admin)