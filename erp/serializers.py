# from rest_framework import serializers
# from erp.models import Pagyeon
# from erp.new_models import Employee
#
# class EmployeeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Employee
#         fields = ('email', 'nickname', 'phonenumber', 'team')
#
#     # email = serializers.CharField(source='email', max_length=100, allow_blank=True, allow_null=True)
#     # nickname = serializers.CharField(max_length=100, allow_blank=True, allow_null=True)
#     # phonenumber = serializers.CharField(max_length=100, allow_blank=True, allow_null=True)
#     # team = serializers.CharField(max_length=100, allow_blank=True, allow_null=True)
#
#
# class PagyeonSerializer(serializers.ModelSerializer):
#     companyprofile_nm = serializers.CharField(read_only=True, source='companyprofile.custname', required=False)
#     class Meta:
#         model = Pagyeon
#         fields = '__all__'