# serializers.py
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
    class Meta:
        model = Startup
        fields = '__all__'
        
class InvestorOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvestorOrganization
        fields = '__all__'
        
class PartnerOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerOrganization
        fields = '__all__'
<<<<<<< b3318f4036e8eb88ff216ea91da4ed0e42e64900
=======

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
>>>>>>> e35f2dc2ba94df3db2f320c6d9fe65f9585e8a2a
        
        
