from django.db import models
from django.db.models import Avg
from backend.models import TimeStampedModel, User, ComIdx, ComCode
import os

# from company_profile.models import (
#     JobAdvertise, JobApplicant
# )


def hr_directory_path(instance, filename):
    if isinstance(instance, HrProfile):
        return 'uploads/hr/{}/{}'.format(str(instance.id) + '.' + instance.custname, filename)
    else:
        return 'uploads/hr/{}/{}'.format(str(instance.hrprofile.id) + '.' + instance.hrprofile.custname, filename)


class HrProfile(TimeStampedModel):
    user = models.ManyToManyField(User, related_name="hrprofile")
    cust_gubun = models.ForeignKey(ComCode, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='사업자형태',
                                   limit_choices_to={'comidx': 'CI'}, default='CI0100000')
    custname = models.CharField(max_length=100, blank=True, null=True, verbose_name='회사명')
    custid = models.CharField(max_length=13, blank=True, null=True, verbose_name='사업자번호')
    emp_count = models.IntegerField(blank=True, null=True, verbose_name='임직원수')
    gross_total = models.IntegerField(blank=True, null=True, verbose_name='매출액')
    telno = models.CharField(max_length=20, blank=True, null=True, verbose_name='대표번호')
    faxno = models.CharField(max_length=20, blank=True, null=True, verbose_name='팩스번호')
    since = models.IntegerField(blank=True, null=True, verbose_name='설립년도')
    homepage = models.CharField(max_length=100, blank=True, null=True, verbose_name='홈페이지')
    introduce = models.TextField(max_length=10000, blank=True, null=True, verbose_name='회사소개')
    status_cd = models.ForeignKey(ComCode, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='승인상태',
                                  limit_choices_to={'comidx': 'CB'}, default='CB0100000', related_name='hr_status_cd')
    status_reason = models.CharField(max_length=500, blank=True, null=True, verbose_name='상태사유(거절사유)')
    cmp_manager = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='hr_cmp_manager',
                                    limit_choices_to={'is_admin': True},
                                    blank=True, null=True, verbose_name='담당매니저')
    manager_email = models.CharField(max_length=30, blank=True, null=True, verbose_name='대표 이메일')
    manager_phone = models.CharField(max_length=11, blank=True, null=True, verbose_name='대표 연락처')
    company_logo = models.FileField(upload_to=hr_directory_path, null=True, blank=True, verbose_name='HR회사 로고')

    services = models.ManyToManyField(ComCode, verbose_name='제공서비스', blank=True, null=True,
                                      related_name='services', limit_choices_to={'comidx': 'AC'})
    service_address = models.ManyToManyField(ComCode, verbose_name='서비스지역', blank=True, null=True,
                                             related_name='service_address', limit_choices_to={'comidx': 'BE'})
    load_addr_code = models.CharField(max_length=5, blank=True, null=True, verbose_name='주소(도로명코드)')
    load_addr = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소(도로명주소)')
    load_addr_detail = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소 상세')
    hr_bokri = models.TextField(max_length=500, blank=True, null=True, verbose_name='HR 복리후생')
    is_expose = models.BooleanField(default=False, verbose_name='노출여부')
    # license_number = models.CharField(max_length=10, blank=True, null=True, verbose_name='허가번호')

    def __str__(self):
        return str(self.custname)

    @property
    def resume_count(self):
        return self.hrprofile_resume.all().count()

    @property
    def jobad_count(self):
        return self.hrprofile_jobapp.all().count()

    def is_partners(self):
        if self.user.all().count() > 0:
            return True
        else:
            return False

    class Meta:
        verbose_name_plural = ('1. HR 프로필 / HRProfile')


# HR 기업프로필 동료
class HrProfileCoWorker(TimeStampedModel):
    hrprofile      = models.ForeignKey(HrProfile, on_delete=models.CASCADE, blank=True, null=True,
                                       verbose_name='회사프로필', related_name='hr_coworker')
    user           = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='User',
                                       related_name='hrprofilecoworker')
    hrprofile_auth = models.ForeignKey(ComCode, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='기업권한',
                                       limit_choices_to={'comidx':'CG'}, default='CG0200000')
    coworker_phone = models.CharField(max_length=11, null=True, blank=True, verbose_name='연락처')

    def __str__(self):
        return str(self.hrprofile_auth)

    @classmethod
    def check_auth(cls, user, hrprofile):
        try:
            auth = cls.objects.filter(user=user, companyprofile=hrprofile).values('hrprofile_auth')[0]['hrprofile_auth']
        except:
            auth = None
        return auth

    class Meta:
        verbose_name_plural = ('1_1. HR회사동료 / HrProfileCoWorker')
        
        
# 전문직종
class HrSpecial(TimeStampedModel):
    hrprofile               = models.ForeignKey(HrProfile, on_delete=models.CASCADE, related_name='hrspecial')
    hr_jikjong_top          = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                   limit_choices_to={'comidx':'AA', 'code_topcd': None},
                                                   verbose_name='직종코드(대)', related_name='hrspecial_jikjong_top')
    hr_jikjong_mid          = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True,
                                                limit_choices_to={'comidx': 'AA'},
                                                verbose_name='직종코드(중)', related_name="hrspecial_jikjong_mid")
    hr_jikjong_low          = models.ManyToManyField(ComCode, blank=True,
                                                     related_name="hrspecial_jikjong_low", verbose_name='직종코드(소)',
                                                     )
    jikjong_tax_start       = models.FloatField(null=True, verbose_name='직종(중) 수수료 시작')
    jikjong_tax_end         = models.FloatField(null=True, verbose_name='직종(중) 수수료 종료')

    class Meta:
        verbose_name_plural = ('2. 전문직종 / HrSpecial')


class HrImage(TimeStampedModel):
    hrprofile   = models.ForeignKey(HrProfile, on_delete=models.CASCADE, related_name='hrprofile_image')
    hr_image    = models.ImageField(upload_to=hr_directory_path,  null=True, blank=True, verbose_name='HR 회사 이미지')

    class Meta:
        verbose_name_plural = ('HR 이미지 / HrImage')

    def hr_image_filename(self):
        return os.path.basename(self.hr_image.name)


class HrFile(TimeStampedModel):
    hrprofile   = models.ForeignKey(HrProfile, on_delete=models.CASCADE, related_name='hrprofile_file')
    hr_file     = models.FileField(upload_to=hr_directory_path, null=True, blank=True, verbose_name='첨부파일')

    class Meta:
        verbose_name_plural = ('HR 파일 / HrFile')

    def hr_filename(self):
        return os.path.basename(self.hr_file.name)


# 청구관련 정보
class HrAccountInfo(TimeStampedModel):
    hrprofile = models.ForeignKey(HrProfile, on_delete=models.CASCADE, related_name='hraccountinfo', verbose_name='청구')
    account_name = models.CharField(max_length=50, verbose_name='청구담당자명')
    account_phone = models.CharField(max_length=13, verbose_name='청구담당자연락처')
    account_email = models.EmailField(verbose_name='계산서발행 Email')

    class Meta:
        verbose_name_plural = ('3. 청구정보 / HrAccountInfo')


# 수수료율 (파견/채대/)
class HrFee(TimeStampedModel):
    hrprofile = models.ForeignKey(HrProfile, on_delete=models.CASCADE, verbose_name='HR회사', related_name='hrfee')
    fee_gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True, verbose_name='수수료 구분',
                                  limit_choices_to={'comidx': 'AC'})
    start = models.IntegerField(verbose_name='구간시작', default=0)
    end = models.IntegerField(verbose_name='구간종료', default=0)
    fee_start = models.FloatField(verbose_name='수수료율 시작(%)', default=0)
    fee_end = models.FloatField(verbose_name='수수료율 종료(%)', default=0)

    class Meta:
        verbose_name_plural = ('1_2. 수수료 / HrFEE')

# # 수수료율 ( 채대 )
# class HrFeeChae(TimeStampedModel):
#     hrprofile = models.ForeignKey(HrProfile, on_delete=models.CASCADE, verbose_name='HR회사')
#     fee_gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True, verbose_name='수수료 구분',
#                                   limit_choices_to={'comidx': 'CH'})
#     start = models.IntegerField(verbose_name='구간시작')
#     end = models.IntegerField(verbose_name='구간종료')
#     fee_start = models.FloatField(verbose_name='수수료율 시작(%)')
#     fee_end = models.FloatField(verbose_name='수수료율 종료(%)')
