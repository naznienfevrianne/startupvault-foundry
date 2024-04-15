from rest_framework import serializers
from .models import *

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

class FounderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Founder
        fields = '__all__'

class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = '__all__'
        
class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class StartupSerializer(serializers.ModelSerializer):
    founder_id = serializers.SerializerMethodField()
    class Meta:
        model = Startup
        fields = '__all__'
        
    def get_founder_id(self, obj):
        # Check if there is a founder associated with the startup
        if hasattr(obj, 'founder'):
            return obj.founder.id
        # If there's no founder associated, you can choose to return None or some default value
        return None
        
class InvestorOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestorOrganization
        fields = '__all__'
        
class PartnerOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerOrganization
        fields = '__all__'


class Top10StartupSerializer(serializers.ModelSerializer):
    rank1 = StartupSerializer()
    rank2 = StartupSerializer()
    rank3 = StartupSerializer()
    rank4 = StartupSerializer()
    rank5 = StartupSerializer()
    rank6 = StartupSerializer()
    rank7 = StartupSerializer()
    rank8 = StartupSerializer()
    rank9 = StartupSerializer()
    rank10 = StartupSerializer()

    class Meta:
        model = Top10Startup
        fields = '__all__'
