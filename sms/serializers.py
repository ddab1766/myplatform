from rest_framework import serializers
from sms.models import AuthSms

class AuthSmsSerializer(serializers.Serializer):
    class Meta:
        model = AuthSms
        fields = '__all__'