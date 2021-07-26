from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from user_profile.views import *

router = routers.DefaultRouter()
router.register(r'userprofile', UserProfileViewSet, )
router.register(r'userSpecial', UserSpecialViewSet, )
router.register(r'interest', InterestSugubModelViewSet, )
router.register(r'comadvkey', CompanyAdvKeyViewSet, )
router.register(r'advkey', UserAdvKeyViewSet, )
router.register(r'interestadv', InterestAdvViewSet, )
router.register(r'userComment', UserCommentViewSet, )

urlpatterns = [
    path('', include(router.urls)),
]