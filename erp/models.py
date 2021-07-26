# from django.db import models
# from company_profile.models import Sugub, CompanyProfile
# # Create your models here.
# class Pagyeon(models.Model):
#
#     emp_name                = models.CharField(max_length=20, blank=True, null=True, verbose_name='성명')
#     sugub                   = models.ForeignKey('company_profile.Sugub', related_name='sugub', db_constraint=False,
#                                                 on_delete=models.DO_NOTHING, blank=True, null=True, verbose_name='수급')
#     #companyprofile          = models.ForeignKey(CompanyProfile, related_name='companyprofile', db_constraint=False,on_delete=models.CASCADE, blank=True, null=True,
#                                           #  verbose_name='기업정보')
#     companyprofile_id       = models.IntegerField(null=True)
#     birth                   = models.CharField(max_length=8, blank=True, null=True, verbose_name='생년월일')
#     term_from_to            = models.CharField(max_length=18, blank=True, null=True, verbose_name='계약기간')
#     zipcode                 = models.CharField(max_length=7, blank=True, null=True, verbose_name='우편번호')
#     addr                    = models.CharField(max_length=150, blank=True, null=True, verbose_name='주소')
#     addr_2                  = models.CharField(max_length=150, blank=True, null=True, verbose_name='상세주소')
#     #ip_start                = models.CharField(max_length=8, blank=True, null=True, verbose_name='입사일')
#     ip_start                = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True, verbose_name='입사일')
#     ip_end                  = models.DateField(auto_now=False, auto_now_add=False, blank=True, null=True, verbose_name='퇴사일')
#     mng_id                  = models.CharField(max_length=20, blank=True, null=True, verbose_name='관리자ID')
#     telno                   = models.CharField(max_length=20, blank=True, null=True, verbose_name='연락처')
#     resume                  = models.ForeignKey('user_profile.Resume', related_name='resume', db_constraint=False,
#                                                 on_delete=models.DO_NOTHING, blank=True, null=True, verbose_name='이력서')
#     def __str__(self):
#         """A string representation of the model."""
#         return str(self.emp_name)
#     @property
#     def companyprofile(self):
#       return CompanyProfile.objects.get(id=self.companyprofile_id)
#
#     class Meta:
#         verbose_name_plural = ('파견사원 / Pagyeon')
#         managed = False
#         db_table = 'pagyeon_pagyeon'