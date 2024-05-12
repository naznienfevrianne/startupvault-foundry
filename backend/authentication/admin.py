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
<<<<<<< ab2dfc31aa01bc1a435eb4c0d95b8411d600b959
    autocomplete_fields = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5','rank6', 'rank7','rank8', 'rank9', 'rank10']
=======
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
>>>>>>> d63fc63cd2a526b89ac1af5588a515374dda65eb

admin.site.register(Top10Startup, Top10StartupAdmin)

class Top10Form(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Customize each rank field to display startup names in a dropdown
        for field_name in ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8', 'rank9', 'rank10']:
            self.fields[field_name].queryset = Startup.objects.filter(founder__isVerified=1)
            self.fields[field_name].widget = forms.Select(choices=self.get_startup_name_choices())

    def get_startup_name_choices(self):
        # Query the database to get a list of startup names
        startup_names = Startup.objects.filter(founder__isVerified=1).values_list('name', flat=True)
        choices = [(name, name) for name in startup_names]
        return choices

    class Meta:
        model = Top10Temp
        fields = ['rank1', 'rank2', 'rank3', 'rank4', 'rank5', 'rank6', 'rank7', 'rank8', 'rank9', 'rank10']

class Top10Admin2(admin.ModelAdmin):
    form = Top10Form

admin.site.register(Top10Temp, Top10Admin2)