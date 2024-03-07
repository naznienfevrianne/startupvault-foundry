# serializers.py
from rest_framework import serializers
from .models import Entry

class FounderEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["id", "sales", "revenue", "user", "lessonLearned", "founder", "date"]
        
class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'


