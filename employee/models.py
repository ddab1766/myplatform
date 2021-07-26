import os, datetime
from django.db import models
from backend.models import TimeStampedModel, User
from company_profile.models import (
    Sugub, CompanyProfile
)
from hr_profile.models import HrProfile
from backend.models import ComCode


class Employee(TimeStampedModel):
    emp_name = models.CharField(max_length=100, blank=False, null=False, verbose_name='사원명')
    emp_phone = models.CharField(max_length=100, blank=False, null=False, verbose_name='연락처')
    emp_birth = models.CharField(max_length=10, blank=False, null=False, verbose_name='생년월일')

    class Meta:
        verbose_name_plural = ('1. 사원 / Employee')

    def __str__(self):
        return self.emp_name

    @property
    def contract_list(self):
        return self.contract_employee.all()


class Contract(TimeStampedModel):
    """
    사원별 계약
    """
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, blank=False, null=False,
                                 related_name='contract_employee')
    sugub    = models.ForeignKey(Sugub, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='수급',
                                 related_name='contract_sugub')
    hrprofile = models.ForeignKey(HrProfile, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='파견사업주',
                                  related_name='contract_hrprofile')
    companyprofile = models.ForeignKey(CompanyProfile, on_delete=models.SET_NULL, blank=True, null=True,
                                       verbose_name='사용사업주', related_name='contract_companyprofile')
    chae_cd = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                limit_choices_to={'comidx': 'AC', 'code_topcd': None},
                                verbose_name='채용형태')
    direct_cost = models.IntegerField(blank=True, null=True, default=0, verbose_name='직접비(Month)')
    contract_gigan = models.IntegerField(blank=True, null=True, default=0, verbose_name='계약기간(개월)')
    contract_from = models.CharField(max_length=8, blank=True, null=True, verbose_name='계약시작일')
    contract_to = models.CharField(max_length=8, blank=True, null=True, verbose_name='계약종료일')
    is_confirm = models.BooleanField(default=False, verbose_name='관리자확인')

    @property
    def is_expired(self):
        try:
            if self.contract_to < datetime.date.today():
                return True
            else:
                return False
        except:
            return True

    # def save(self, *args, **kwargs):
    #
    #     if self.chae_cd_id == 'AC0100000':
    #         fee = round(self.direct_cost * self.contract_gigan * 0.005)
    #     elif self.chae_cd_id == 'AC0300000': # 채용대행건
    #         fee = round(self.direct_cost * 12 * 0.005)
    #         self.contract_gigan = 0
    #     else:
    #         fee = 0
    #
    #     super().save(*args, **kwargs)
    #     if fee > 0:
    #         instance, created = Fee.objects.update_or_create(
    #             contract=self,
    #             defaults={
    #                 'fee': fee,
    #             },
    #         )
    #         instance.save()

    class Meta:
        verbose_name_plural = ('2. 계약 / Contract')


def contract_directory_path(instance, filename):
    return 'uploads/hr/{}/contract/{}/{}'.format(str(instance.contract.hrprofile.id) + '.' + instance.contract.hrprofile.custname,
                                                 instance.contract.sugub.companyprofile.custname,
                                                 filename)


class ContractFile(TimeStampedModel):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, blank=False, null=False,
                                 related_name='contract_file')
    contract_file = models.FileField(upload_to=contract_directory_path, null=True, blank=True,
                                     verbose_name='계약관련파일')
    
    class Meta:
        verbose_name_plural = ('2_1. 계약첨부파일 / ContractFile')

    def contract_filename(self):
        return os.path.basename(self.contract_file.name)


class Fee(TimeStampedModel):
    contract = models.OneToOneField(Contract, on_delete=models.CASCADE, blank=False, null=False,
                                    related_name='fee_contract')
    fee = models.IntegerField(default=0, verbose_name='수수료')

    class Meta:
        verbose_name_plural = ('3. 수수료 / Fee')


class Refund(TimeStampedModel):
    hrprofile = models.ForeignKey(HrProfile, on_delete=models.CASCADE, blank=False, null=False,
                                  related_name='refund_hrprofile', verbose_name='요청회사')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, verbose_name='요청자',
                             related_name='refund_user')
    # employee = models.ForeignKey(Employee, on_delete=models.CASCADE, blank=False, null=False,
    #                              related_name='refund_employee', verbose_name='환불 대상자')
    contract = models.OneToOneField(Contract, on_delete=models.CASCADE, blank=False, null=False,
                                    related_name='refund_contract', verbose_name='환불 계약')
    gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=False, null=False,
                              limit_choices_to={'comidx': 'ZF'}, default='ZF0100000', verbose_name='환불방식',
                              related_name='refund_gubun')
    reason = models.TextField(max_length=2000, blank=True, null=True, verbose_name='요청사유')
    refund_status = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=False, null=False, default='ZG0100000',
                                      limit_choices_to={'comidx': 'ZG'}, verbose_name='환불상태')

    class Meta:
        verbose_name_plural = ('4. 환불 / Refund')


def refund_directory_path(instance, filename):
    return 'uploads/hr/{}/refund/{}'.format(str(instance.refund.hrprofile.id) + '.' + instance.refund.hrprofile.custname,
                                            filename)


class RefundFile(TimeStampedModel):
    refund = models.ForeignKey(Refund, on_delete=models.CASCADE, blank=False, null=False,
                               related_name='refund_file')
    refund_file = models.FileField(upload_to=refund_directory_path, null=True, blank=True,
                                   verbose_name='환불관련파일')

    class Meta:
        verbose_name_plural = ('4_1. 환불첨부파일 / RefundFile')

    def contract_filename(self):
        return os.path.basename(self.refund_file.name)