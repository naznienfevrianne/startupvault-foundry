# serializers.py
from rest_framework import serializers
from .models import Entry

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'
