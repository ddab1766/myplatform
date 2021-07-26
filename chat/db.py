from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from backend.models import (
    User
)
from company_profile.models import Sugub

from chat.serializers import MessageSerializer
from rest_framework.parsers import JSONParser

from backend.serializers import UserSimpleSerializer
from .models import (
    ChatRoom, Message
)


@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()


@database_sync_to_async
def get_sugub(sugub_id):
    try:
        return Sugub.objects.get(id=sugub_id)
    except Sugub.DoesNotExist:
        return None


@database_sync_to_async
def get_room(user, receiver, sugub):
    # print('user, receiver, sugub?', user, receiver, sugub)
    room_id = ChatRoom.get_room_number(user, receiver)
    # print('room_id', room_id)
    if room_id is not None:
        return room_id
    else:
        room = ChatRoom.objects.create()
        room.participants.add(user)
        room.participants.add(receiver)
        room.participants.add(1) # admin
        room.sugub = sugub
        room.save()
        return room.id


@database_sync_to_async
def exit_room(user, room_id):
    room = ChatRoom.objects.get(id=room_id)
    room.participants.remove(user)
    room.exit_participants.add(user)
    room.is_end = True # 채팅방 종료
    room.save()
    return room.id


@database_sync_to_async
def get_message(room_id):
    # messages = Message.last_50_messages(room_id=data['room_id'])
    messages = Message.last_50_messages(room_id=room_id)
    # data = JSONParser().parse(messages)
    # serializer = MessageSerializer(data=data)
    # serializer.is_vaild()
    # print('serializer', serializer)
    result = []
    for message in messages:
        # print('get_message', message.author.profile_image)
        # try:
        #     profile_image = message.author.profile_image
        # except:
        #     profile_image = None
        result.append(
            {
                'id': str(message.id),
                # 'author': message.author.email,
                'author': UserSimpleSerializer(message.author).data,
                'content': message.content,
                'created_at': message.created_at.strftime("%H:%M")
            }
        )
    return result


@database_sync_to_async
def create_message(room_id, author_user, text):
    message = Message.objects.create(
        chatroom_id=room_id,
        author=author_user, content=text
    )
    return {
        'id': str(message.id),
        # 'author': message.author.email,
        'author': UserSimpleSerializer(message.author).data,
        'content': message.content,
        'created_at': message.created_at.strftime("%H:%M")
    }


class QueryAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, inner):
        # Store the ASGI application we were passed
        self.inner = inner

    def __call__(self, scope):
        return QueryAuthMiddlewareInstance(scope, self)


class QueryAuthMiddlewareInstance:
    """
    Inner class that is instantiated once per scope.
    """

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        self.scope['user'] = await get_user(int(self.scope["query_string"]))

        # Instantiate our inner application
        inner = self.inner(self.scope)

        return await inner(receive, send)

