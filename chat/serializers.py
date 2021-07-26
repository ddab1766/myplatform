from rest_framework import serializers
from backend.serializers import UserSimpleSerializer
from company_profile.serializers import SugubSimpleSerializer


class MessageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    chatroom = serializers.PrimaryKeyRelatedField(read_only=True)
    author = UserSimpleSerializer()
    content = serializers.CharField()
    # created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    created_at = serializers.DateTimeField(format='%H:%M')


class ChatSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    participants = UserSimpleSerializer(many=True)
    exit_participants = UserSimpleSerializer(many=True)
    # participants = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    room_name = serializers.CharField()
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    chatroom_messages = MessageSerializer(read_only=True, many=True)
    sugub = SugubSimpleSerializer()
    is_end = serializers.BooleanField()