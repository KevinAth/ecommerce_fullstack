from rest_framework import serializers
from .models import customUser,addresses

class serializerUser(serializers.ModelSerializer):
    class Meta:
        model = customUser
        fields = '__all__'
class serializarAddress(serializers.ModelSerializer):
    class Meta:
        model = addresses
        fields = '__all__'