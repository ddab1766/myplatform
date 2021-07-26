from rest_framework import serializers
from .models import (
    Employee, Contract, ContractFile,
    Refund, RefundFile,
    Fee)
from backend.serializers import ComCodeSerializer
from company_profile.serializers import CompanyProfileSimpleSerializer
from hr_profile.serializers import HrProfileSimpleSerializer

class EmployeeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    emp_name = serializers.CharField()
    emp_phone = serializers.CharField()
    emp_birth = serializers.CharField()


class RefundFileSerializer(serializers.ModelSerializer):
    refund = serializers.FileField()
    refund_file = serializers.CharField()

    class Meta:
        model = RefundFile
        fields = ['id', 'refund_file', 'refund_filename', 'created_time']


class RefundSerializer(serializers.Serializer):
    hrprofile = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    contract = serializers.PrimaryKeyRelatedField(read_only=True)
    gubun = ComCodeSerializer()
    reason = serializers.CharField()
    refund_status = ComCodeSerializer()


class RefundModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Refund
        fields = ['id', 'hrprofile', 'user', 'contract', 'gubun', 'reason', 'refund_status']
        read_only_fields = ['user', 'hrprofile']

    def create(self, validated_data):
        refund = Refund.objects.create(**validated_data)
        file_data = self.context['request'].FILES
        if file_data:
            refund_file = file_data.get('refund_file')
            refund_file, created = RefundFile.objects.get_or_create(refund=refund, refund_file=refund_file)

        return refund

class ContractFileSerializer(serializers.ModelSerializer):
    contract_file = serializers.FileField()
    contract_filename = serializers.CharField()

    class Meta:
        model = ContractFile
        fields = ['id', 'contract_file', 'contract_filename', 'created_time']


class ContractSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    employee = EmployeeSerializer()
    sugub = serializers.PrimaryKeyRelatedField(read_only=True)
    # hrprofile = serializers.PrimaryKeyRelatedField(read_only=True)
    hrprofile = HrProfileSimpleSerializer()
    companyprofile = CompanyProfileSimpleSerializer()
    direct_cost = serializers.IntegerField()
    contract_gigan = serializers.IntegerField()
    chae_cd = ComCodeSerializer()
    created_time = serializers.DateTimeField(format='%Y-%m-%d')
    contract_file = ContractFileSerializer(many=True, read_only=True)
    is_confirm = serializers.BooleanField()
    contract_from = serializers.CharField()
    contract_to = serializers.CharField()
    refund_id = serializers.SerializerMethodField(read_only=True)
    refund_contract = RefundSerializer()

    def get_refund_id(self, obj):
        try:
            return obj.refund_contract.id
        except:
            return None


class ContractModelSerializer(serializers.ModelSerializer):
    is_expired = serializers.BooleanField(read_only=True)
    refund_list = serializers.PrimaryKeyRelatedField(read_only=True)
    chae_cd = ComCodeSerializer()

    class Meta:
        model = Contract
        fields = ['id', 'employee', 'sugub', 'companyprofile', 'hrprofile', 'direct_cost', 'contract_gigan',
                  'contract_from', 'contract_to', 'is_expired', 'chae_cd', 'is_confirm', 'refund_list']

    def update(self, instance, validated_data):
        instance = super(ContractModelSerializer, self).update(instance, validated_data)
        file_data = self.context['request'].FILES
        if file_data:
            contract_file = file_data.get('contract_file')
            contractfile, created = ContractFile.objects.update_or_create(contract=instance,
                                                                          defaults={
                                                                              'contract_file': contract_file
                                                                          })

        # Fee Create
        if instance.chae_cd_id == 'AC0100000': # 파견
            fee = round(instance.direct_cost * instance.contract_gigan * 0.07 * 0.1)
        elif instance.chae_cd_id == 'AC0300000': # 채용대행
            fee = round(instance.direct_cost * 0.15 * 0.1)
        else:
            fee = 0

        if fee > 0:
            fee_instance, created = Fee.objects.update_or_create(
                contract=instance,
                defaults={
                    'fee': fee,
                },
            )
            fee_instance.save()

        return instance


class EmployeeModelSerializer(serializers.ModelSerializer):
    contract_list = ContractModelSerializer(many=True)

    class Meta:
        model = Employee
        fields = ['id', 'emp_name', 'emp_phone', 'emp_birth', 'contract_list']


class FeeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    # contract = serializers.PrimaryKeyRelatedField(read_only=True)
    contract = ContractSerializer(read_only=True)
    fee = serializers.IntegerField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d')

