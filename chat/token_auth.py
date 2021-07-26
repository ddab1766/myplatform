from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.db import close_old_connections
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser
import re


@database_sync_to_async
def get_token_user(token_key):
    try:
        return Token.objects.get(key=token_key).user
    except Token.DoesNotExist:
        return AnonymousUser()


class TokenAuthMiddleware:

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, scope, middleware):
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        try:
            token_key = self.scope['query_string'].decode()[6:]
            self.scope['user'] = await get_token_user(token_key)
            print('scope user', self.scope['user'])
        except:
            self.scope['user'] = AnonymousUser()
        inner = self.inner(self.scope)
        return await inner(receive, send)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))