from rest_framework import serializers
from .models import Founder, Entry

class FounderEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["sales", "revenue", "user", "lessonLearned", "founder", "date"]

class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["sales", "revenue", "user", "lessonLearned", "date"]

