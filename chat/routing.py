from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/chat$', consumers.ChatConsumer),
    re_path(r'^ws/chat/(?P<receiver>\d+)/(?P<sugubid>\d+)/$', consumers.ChatConsumer),
    re_path(r'^ws/chat/(?P<room_number>\d+)/?$', consumers.ChatConsumer),
]

