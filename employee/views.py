from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from backend.models import User
from rest_framework_filters.backends import RestFrameworkFilterBackend
from employee.filters import EmployeeFilter, HrFeeFilter

from .serializers import EmployeeModelSerializer, ContractModelSerializer, ContractSerializer, FeeSerializer, \
    RefundModelSerializer
from .models import Employee, Contract, Fee, Refund


class EmployeeViewSet(viewsets.ModelViewSet):
    """
    /api/employee/employee/
    """
    permission_classes = [
        # permissions.IsAuthenticated,
        permissions.AllowAny
    ]
    queryset = Employee.objects.all()
    serializer_class = EmployeeModelSerializer
    # pagination_class = None
    filter_backends = [RestFrameworkFilterBackend]
    filter_class = EmployeeFilter

    def get_queryset(self):
        queryset = self.queryset.all()
        user = self.request.user
        # user = User.objects.get(email='hr1@hr.com')

        if user.is_anonymous:
            user = None
        elif user.is_admin:
            queryset = Contract.objects.all()
        else:
            companyprofile, hrprofile = user.check_profile(user)
            if companyprofile is not None:
                queryset = Contract.objects.filter(Q(companyprofile=companyprofile) & Q(is_confirm=True))
            elif hrprofile is not None:
                queryset = Contract.objects.filter(hrprofile=hrprofile)
        return queryset

    # @action(detail=False, permission_classes=[permissions.IsAuthenticated])
    @action(detail=False, permission_classes=[permissions.IsAuthenticated])
    def get_employee(self, request, pk=None):
        """
        로그인된 User 의 Hrprofile 에 속한 Employee 를 가져온다.
        관리자는 전체 Contract Instance 가져온다.
        """
        qs = self.filter_queryset(self.get_queryset())

        ordering = request.GET.get('ordering', '1')
        if ordering == '1':  # 등록 순
            qs = sorted(qs, key=lambda t: t.created_time, reverse=True)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = ContractSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ContractSerializer(qs, many=True)
        return Response(serializer.data)

        # user = request.user

        # if user.is_anonymous:
        #     user = None
        # elif user.is_admin:
        #     contract_qs = Contract.objects.all()
        # else:
        #     companyprofile, hrprofile = user.check_profile(user)
        #     if companyprofile is not None:
        #         contract_qs = Contract.objects.filter(Q(companyprofile=companyprofile) & Q(is_confirm=True))
        #     elif hrprofile is not None:
        #         contract_qs = Contract.objects.filter(hrprofile=hrprofile)

        # serializer = ContractSerializer(contract_qs, many=True)
        # return Response(serializer.data)


class ContractModelViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractModelSerializer
    permission_classes = [permissions.AllowAny, ]
    pagination_class = None


class FeeReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer
    permission_classes = [permissions.AllowAny, ]
    filter_backends = [RestFrameworkFilterBackend]
    filter_class = HrFeeFilter
    pagination_class = None

    def get_queryset(self):
        user = self.request.user

        # user = User.objects.get(email='test@unies.com')
        if user.is_anonymous:
            queryset = None
        else:
            companyprofile, hrprofile = user.check_profile(user)
            queryset = Fee.objects.filter(contract__hrprofile=hrprofile).all()

        return queryset


class RefundModelViewSet(viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundModelSerializer
    permission_classes = [permissions.AllowAny, ]
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        companyprofile, hrprofile = user.check_profile(user)
        serializer.save(user=User.objects.get(email=user), hrprofile=hrprofile)