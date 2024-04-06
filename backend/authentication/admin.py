from django.contrib import admin
from .models import *
from django import forms

# Register your models here.
admin.site.register(UserModel)
admin.site.register(Startup)
admin.site.register(Founder)
admin.site.register(Investor)
admin.site.register(Partner)

# Form create Top 10 Startup List
class Top10StartupForm(forms.ModelForm):
    class Meta:
        model = Startup
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Filter startup with a verified founder
        self.fields['rank1'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank2'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank3'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank4'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank5'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank6'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank7'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank8'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank9'].queryset = Startup.objects.filter(founder__isVerified=1)
        self.fields['rank10'].queryset = Startup.objects.filter(founder__isVerified=1)


class Top10StartupAdmin(admin.ModelAdmin):
    form = Top10StartupForm

admin.site.register(Top10Startup, Top10StartupAdmin)
