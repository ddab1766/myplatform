from rest_framework import viewsets, permissions
from .serializers import ChatSerializer
from .models import ChatRoom


class ChatReadOnlyModelView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    # queryset = ChatRoom.objects.all()
    queryset = ChatRoom.objects \
        .prefetch_related('participants') \
        .all()
    serializer_class = ChatSerializer
    # pagination_class = None

    def get_queryset(self):
        return ChatRoom.objects.filter(participants__in=[self.request.user]).order_by('-created_at')