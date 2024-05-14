from rest_framework import serializers
from .models import Event

class EventDetailsSer(serializers.ModelSerializer):
    partner_organization = serializers.CharField(source='partner.partnerOrganization.name', read_only=True)
    partner_org_id = serializers.CharField(source='partner.partnerOrganization.id', read_only=True)
    organization_logo = serializers.CharField(source='partner.partnerOrganization.logo', read_only=True)
    class Meta:
        model = Event
        fields = ["id", "name", "summary", "desc", "location", "date", "price", "link", "image", "partner_organization", "organization_logo", "partner_org_id"]

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
    def get_partner_id(self, obj):
        if hasattr(obj, 'partner'):
            return obj.partner.id
        return None
