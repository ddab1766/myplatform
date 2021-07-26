from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from .views import EmployeeViewSet, ContractModelViewSet, FeeReadOnlyViewSet, RefundModelViewSet

router = routers.DefaultRouter()
router.register(r'employee', EmployeeViewSet, )
router.register(r'contract', ContractModelViewSet, )
router.register(r'fee', FeeReadOnlyViewSet, )
router.register(r'refund', RefundModelViewSet, )

urlpatterns = [
    path('', include(router.urls)),
]