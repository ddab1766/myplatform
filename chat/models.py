import uuid
from django.db import models
from django.db.models import Q
from django.core.exceptions import ValidationError
from backend.models import (
    User
)


def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )


class ChatRoom(models.Model):
    participants = models.ManyToManyField(
        User, blank=True, null=True, related_name='chatroom', verbose_name='참여자'
    )
    exit_participants = models.ManyToManyField(
        User, blank=True, null=True, related_name='chatroom_exit_participants',
        verbose_name='퇴장'
    )
    sugub = models.ForeignKey("company_profile.Sugub", on_delete=models.SET_NULL, blank=True, null=True,
                              related_name='sugub_chatroom')
    room_name = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    is_end = models.BooleanField(default=False, verbose_name='종료상태')

    @classmethod
    def get_room_number(cls, me, him):
        try:
            room = cls.objects.filter(Q(participants__in=[me]))\
                .filter(Q(participants__in=[him])).values('id')[0]['id']
            return room
        except:
            return None


class Message(models.Model):
    id = models.UUIDField(
        primary_key=True,
        null=False,
        default=uuid.uuid4,
        editable=False
    )
    chatroom = models.ForeignKey('ChatRoom', on_delete=models.CASCADE, blank=True, null=True,
                                 related_name='chatroom_messages')
    author = models.ForeignKey(
        User,
        blank=False,
        null=False,
        related_name='author_messages',
        on_delete=models.CASCADE
    )
    content = models.TextField(validators=[validate_message_content])
    created_at = models.DateTimeField(auto_now_add=True, blank=True)

    @classmethod
    def last_50_messages(cls, room_id):
        return Message.objects.filter(chatroom_id=room_id).order_by('-created_at').all()[:50]

    class Meta:
        ordering = ('-created_at', )