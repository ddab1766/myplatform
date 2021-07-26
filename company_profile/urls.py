from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from company_profile.views import *


router = routers.DefaultRouter()
router.register(r'companyprofile', CompanyProfileViewSet, )
router.register(r'coworker', CompanyProfileCoWorkerViewSet, )
router.register(r'sugub/sign', SugubSignModelViewSet, )
router.register(r'sugub', SugubModelViewSet, )
router.register(r'jobAd', JobAdViewSet, )
router.register(r'jobApp', JobAppModelViewSet, )
router.register(r'sugubreview', SugubReviewViewSet, )
router.register(r'estimate', EstimateModelViewSet, )
router.register(r'interview', InterviewModelViewSet, )


urlpatterns = [
    path('', include(router.urls)),
]