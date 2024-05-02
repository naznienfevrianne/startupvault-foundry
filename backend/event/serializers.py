from rest_framework import serializers
from event.models import Event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
    def get_partner_id(self, obj):
        if hasattr(obj, 'partner'):
            return obj.partner.id
        return None