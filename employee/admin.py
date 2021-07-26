from django.contrib import admin
from .models import (
    Employee, Contract, ContractFile, Fee,
    Refund, RefundFile)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['id', 'emp_name', 'emp_phone', 'emp_birth']


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = ['id', 'employee', 'companyprofile', 'hrprofile', 'contract_from', 'contract_to', 'sugub', 'direct_cost',
                    'contract_gigan', 'is_confirm']


@admin.register(ContractFile)
class ContractFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'contract', 'contract_file',]


@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ['id', 'contract', 'fee',]


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ['id', 'gubun', 'hrprofile', 'user', 'contract', 'reason',]


@admin.register(RefundFile)
class RefundFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'refund', 'refund_file',]