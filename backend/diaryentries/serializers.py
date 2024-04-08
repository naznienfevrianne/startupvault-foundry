from rest_framework import serializers
from .models import Founder, Entry

class FounderEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["id", "sales", "revenue", "user", "lessonLearned", "founder", "date"]

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["sales", "revenue", "user", "lessonLearned", "date"]

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = '__all__'

class FollowedFounderEntrySerializer(serializers.ModelSerializer):
    startup = serializers.CharField(source='founder.startup.name', read_only=True)
    startup_type = serializers.CharField(source='founder.startup.typ', read_only=True)
    startup_image = serializers.CharField(source='founder.startup.image', read_only=True)
    class Meta:
        model = Entry
        fields = ["id", "sales", "revenue", "user", "lessonLearned", "founder", "date", "startup", "startup_type", "startup_image"]