from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from hr_profile.views import (
    HrProfileViewSet, HrProfileCoWorkerViewSet, HrSpecialModelViewSet, HrAccountModelViewSet
)

router = routers.DefaultRouter()
router.register(r'coworker', HrProfileCoWorkerViewSet, )
router.register(r'hrprofile', HrProfileViewSet, )
router.register(r'hrspecial', HrSpecialModelViewSet, )
router.register(r'account', HrAccountModelViewSet, )

urlpatterns = [
    path('', include(router.urls)),
]