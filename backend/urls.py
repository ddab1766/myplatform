from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from .views import (
    AlarmSettingModelViewSet,
    InvitationsModelViewSet
)

router = routers.DefaultRouter()
router.register(r'setting/alarm', AlarmSettingModelViewSet, )
router.register(r'invitations', InvitationsModelViewSet, )

urlpatterns = [
    path('', include(router.urls)),
]
