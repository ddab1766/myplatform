from django_filters.rest_framework import DjangoFilterBackend
import rest_framework_filters as filters
from django.db.models import Q
from backend.models import ComCode
from backend.filters import EndFilter


#  JobApp 필터
class EmployeeFilter(filters.FilterSet):
    sugub_title = filters.CharFilter(field_name='sugub__sugub_title', lookup_expr='contains')
    chae_cd = filters.ModelChoiceFilter(field_name='sugub__chae_cd',
                                        queryset=ComCode.objects.filter(Q(code_topidx='AC') & Q(code_topcd=None)))
    created_time_min = filters.DateFilter(field_name='created_time', lookup_expr='gte')
    # created_time_max = filters.DateFilter(field_name='created_time', lookup_expr='lte')
    created_time_max = EndFilter(field_name='created_time', lookup_expr='lt')
    company_name = filters.CharFilter(field_name='companyprofile__custname', lookup_expr='contains')
    emp_name = filters.CharFilter(field_name='employee__emp_name', lookup_expr='contains')
    emp_phone = filters.CharFilter(field_name='employee__emp_phone', lookup_expr='contains')


#  HrFee 필터
class HrFeeFilter(filters.FilterSet):
    # 서비스 사용 년월
    created_time_min = filters.DateFilter(field_name='contract__created_time', lookup_expr='gte')
    # created_time_max = filters.DateFilter(field_name='contract__created_time', lookup_expr='lte')
    created_time_max = EndFilter(field_name='contract__created_time', lookup_expr='lt')
    # yymm = filters.NumberFilter(field_name='contract__created_time', lookup_expr='month')