from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json

from .db import (
    get_user, get_room, get_message, create_message,
    get_sugub, exit_room)


class ChatConsumer(AsyncWebsocketConsumer):

    async def init_chat(self, data):
        print('init_chat..self', self.room_id)
        print('init_chat..data', data)
        content = {
            'command': 'init_chat'
        }
        # if not user:
        #     content['error'] = 'Unable to get or create User with username: ' + username
        #     self.send_message(content)
        content['success'] = 'Chatting in with success'
        content['room_number'] = self.room_id
        await self.send_message(content)

    async def fetch_messages(self, data):
        messages = await get_message(self.room_id)
        content = {
            'command': 'messages',
            'messages': messages
        }
        await self.send_message(content)

    async def new_message(self, data):
        author = data['from']
        text = data['text']
        author_user = await get_user(author)
        message = await create_message(room_id=self.room_id, author_user=author_user, text=text)
        content = {
            'command': 'new_message',
            'message': message
        }
        await self.send_chat_message(content)

    async def exit_room(self, data):
        room_id = data['room_number']
        await exit_room(self.scope["user"], room_id)
        content = {
            'command': 'room_number',
            'message': '채팅방을 나갔습니다.'
        }
        await self.send_chat_message(content)
        # await self.channel_layer.group_discard(
        #     self.room_group_name,
        #     self.channel_name
        # )

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'exit_room': exit_room
    }

    async def connect(self):
        print('connect..')
        try:
            self.room_id = self.scope['url_route']['kwargs']['room_number']
        except:
            self.room_id = None
            # await self.close()

        # 신규채팅
        if self.room_id is None:
            self.receiver = self.scope['url_route']['kwargs']['receiver']
            self.sugub = self.scope['url_route']['kwargs']['sugubid']
            user = self.scope["user"]
            receiver = await get_user(self.receiver)
            sugub = await get_sugub(self.sugub)
            self.room_id = await get_room(user, receiver, sugub)

        self.room_group_name = 'chat_%s' % self.room_id

        print('GroupName:', self.room_group_name)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print('disconnect close_code', close_code)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print('receive text_data', text_data)
        data = json.loads(text_data)
        await self.commands[data['command']](self, data)

    async def send_message(self, message):
        await self.send(text_data=json.dumps(message))

    async def send_chat_message(self, message):
        print('send_chat_message room_group_name:', self.room_group_name)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))
