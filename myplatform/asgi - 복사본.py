"""
ASGI entrypoint file for default channel layer.

Points to the channel layer configured as "default" so you can point
ASGI applications at "multichat.asgi:channel_layer" as their channel layer.
"""
import sys
sys.path.append("..")
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myplatform.settings')
django.setup()
# from django.conf import settings
# settings.configure()
# import chat.routing
from chat.routing import websocket_urlpatterns
from chat.token_auth import TokenAuthMiddlewareStack
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application


# os.environ['DJANGO_SETTINGS_MODULE'] = 'myplatform.settings'



application = ProtocolTypeRouter({
    # "http": get_asgi_application(),
    # 'websocket': AuthMiddlewareStack(
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            # "chat.routing.websocket_urlpatterns"
            websocket_urlpatterns
        )
    ),
})


# import os
# import django
# from channels.routing import get_default_application
#
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myplatform.settings')
#
# django.setup()
#
# application = get_default_application()