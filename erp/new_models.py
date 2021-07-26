# # This is an auto-generated Django model module.
# # You'll have to do the following manually to clean this up:
# #   * Rearrange models' order
# #   * Make sure each model has one field with primary_key=True
# #   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
# #   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# # Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models
#
# from backend.models import ComCode
# # from company_profile.models import Sugub, CompanyProfile
# from backend.models import TimeStampedModel
# from user_profile.models import Resume
#
#
# class AccountEmailaddress(models.Model):
#     email = models.CharField(unique=True, max_length=254)
#     verified = models.IntegerField()
#     primary = models.IntegerField()
#     user = models.ForeignKey('Employee', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'account_emailaddress'
#
#
# class AccountEmailconfirmation(models.Model):
#     created = models.DateTimeField()
#     sent = models.DateTimeField(blank=True, null=True)
#     key = models.CharField(unique=True, max_length=64)
#     email_address = models.ForeignKey(AccountEmailaddress, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'account_emailconfirmation'
#
#
# class AuthGroup(models.Model):
#     name = models.CharField(unique=True, max_length=150)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group'
#
#
# class AuthGroupPermissions(models.Model):
#     group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
#     permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_group_permissions'
#         unique_together = (('group', 'permission'),)
#
#
# class AuthPermission(models.Model):
#     name = models.CharField(max_length=255)
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
#     codename = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'auth_permission'
#         unique_together = (('content_type', 'codename'),)
#
#
# class AuthtokenToken(models.Model):
#     key = models.CharField(primary_key=True, max_length=40)
#     created = models.DateTimeField()
#     user = models.OneToOneField('Employee', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'authtoken_token'
#
#
# class ChaegongComcode(models.Model):
#     code_id = models.CharField(primary_key=True, max_length=9)
#     code_name = models.CharField(max_length=50)
#     code_topidx = models.CharField(max_length=2, blank=True, null=True)
#     code_topcd = models.CharField(max_length=9, blank=True, null=True)
#     code_use = models.IntegerField()
#     comidx = models.ForeignKey('ChaegongComidx', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'chaegong_comcode'
#
#
# class ChaegongComidx(models.Model):
#     idx_id = models.CharField(primary_key=True, max_length=2)
#     idx_name = models.CharField(max_length=50)
#     idx_use = models.IntegerField()
#
#     class Meta:
#         managed = False
#         db_table = 'chaegong_comidx'
#
#
# class Crmcompanybaseinfo(models.Model):
#     companycode = models.CharField(unique=True, max_length=20, blank=True, null=True, verbose_name='기업코드')
#     custid = models.CharField(max_length=12, blank=True, null=True, verbose_name='사업자번호')
#     subject = models.CharField(max_length=10, blank=True, null=True, verbose_name='종목')
#     main_category = models.CharField(max_length=2, blank=True, null=True, verbose_name='업종대분류')
#     mid_category = models.CharField(max_length=3, blank=True, null=True, verbose_name='업종중분류')
#     detail1_category = models.CharField(max_length=4, blank=True, null=True, verbose_name='세분류1')
#     detail2_category = models.CharField(max_length=5, blank=True, null=True, verbose_name='세분류2')
#     com_name = models.CharField(max_length=100, blank=True, null=True, verbose_name='회사명')
#     stock_code = models.CharField(max_length=6, blank=True, null=True, verbose_name='거래소코드')
#     finance_year = models.CharField(max_length=6, blank=True, null=True, verbose_name='회계년도')
#     group_name = models.CharField(max_length=100, blank=True, null=True, verbose_name='그룹사명')
#     telno = models.CharField(max_length=20, blank=True, null=True, verbose_name='전화번호')
#     faxno = models.CharField(max_length=20, blank=True, null=True, verbose_name='팩스번호')
#     zipno = models.CharField(max_length=6, blank=True, null=True, verbose_name='우편번호')
#     addr = models.CharField(max_length=300, blank=True, null=True, verbose_name='주소1')
#     addr_detail = models.CharField(max_length=500, blank=True, null=True, verbose_name='상세주소')
#     found_date = models.CharField(max_length=8, blank=True, null=True, verbose_name='설립일')
#     website = models.CharField(max_length=100, blank=True, null=True, verbose_name='홈페이지')
#     corporation_num = models.CharField(max_length=30, blank=True, null=True, verbose_name='법인등록번호')
#     # mng_id                  = models.CharField(max_length=30, blank=True, null=True, verbose_name='관리자아이디')
#     # mng                     = models.ForeignKey(Employee, blank=True, null=True, verbose_name='관리자아이디',  on_delete=models.CASCADE)
#     remark = models.CharField(max_length=4000, blank=True, null=True, verbose_name='리마크')
#     com_type = models.CharField(max_length=20, blank=True, null=True, verbose_name='업체타입')
#     # entrydate               = models.DateTimeField(null=True)
#     entryid = models.CharField(max_length=20, blank=True, null=True, verbose_name='입력아이디')
#     # moddate                 = models.DateTimeField(null=True)
#     modid = models.CharField(max_length=20, blank=True, null=True, verbose_name='수정자')
#     use_yn = models.CharField(max_length=1, blank=True, null=True, verbose_name='사용구분')
#     emp_count = models.CharField(max_length=10, blank=True, null=True, verbose_name='사원수')
#     gross_total = models.IntegerField(blank=True, null=True, verbose_name='매출액')
#     partner_cnt = models.CharField(max_length=10, blank=True, null=True, verbose_name='파트너사 수')
#     partner_emp_cnt = models.CharField(max_length=10, blank=True, null=True, verbose_name='파트너사 사원수')
#     confirm_yn = models.CharField(max_length=1, blank=True, null=True, verbose_name='컨펌여부')
#     typecode = models.CharField(max_length=10, blank=True, null=True, verbose_name='타입코드')
#     title_code = models.CharField(max_length=1, blank=True, null=True, verbose_name='메인대분류')
#     hold_yn = models.CharField(max_length=1, blank=True, null=True, verbose_name='홀드여부')
#     hold_id = models.CharField(max_length=20, blank=True, null=True, verbose_name='홀드유저')
#     group_cd = models.CharField(max_length=10, blank=True, null=True, verbose_name='그룹사코드')
#     company_stat = models.CharField(max_length=9, blank=True, null=True, verbose_name='업체상태')
#     nation_code = models.CharField(max_length=9, blank=True, null=True, verbose_name='국가코드')
#     second_comname = models.CharField(max_length=100, blank=True, null=True, verbose_name='보조상호')
#
#     class Meta:
#         managed = False
#         db_table = 'crm_crmcompanybaseinfo'
#         verbose_name_plural = ('회사기본정보 / Crmcompanybaseinfo')
#
#     def __str__(self):
#         return str(self.com_name)
#
# #
# # class CrmCrmcompanymanager(models.Model):
# #     id = models.OneToOneField(Crmcompanybaseinfo, models.DO_NOTHING, primary_key=True)
# #     custid = models.CharField(max_length=12, blank=True, null=True)
# #     email = models.CharField(max_length=100, blank=True, null=True)
# #     entrydate = models.DateTimeField(blank=True, null=True)
# #     entryid = models.CharField(max_length=30, blank=True, null=True)
# #     hpno = models.CharField(max_length=50, blank=True, null=True)
# #     indamcharacter = models.CharField(max_length=1000, blank=True, null=True)
# #     indamgrade = models.CharField(max_length=20, blank=True, null=True)
# #     indamname = models.CharField(max_length=20, blank=True, null=True)
# #     indampart = models.CharField(max_length=20, blank=True, null=True)
# #     keyman = models.IntegerField(blank=True, null=True)
# #     mng_id = models.CharField(max_length=30, blank=True, null=True)
# #     moddate = models.DateTimeField(blank=True, null=True)
# #     modid = models.CharField(max_length=30, blank=True, null=True)
# #     remark = models.CharField(max_length=4000, blank=True, null=True)
# #     seqno = models.IntegerField(blank=True, null=True)
# #     telno = models.CharField(max_length=50, blank=True, null=True)
# #     companycode = models.CharField(unique=True, max_length=20, blank=True, null=True)
# #
# #     class Meta:
# #         managed = False
# #         db_table = 'crm_crmcompanymanager'
# #
# #
# # class CrmCrmcompanyremark(models.Model):
# #     id = models.OneToOneField(Crmcompanybaseinfo, models.DO_NOTHING, primary_key=True)
# #     mng_id = models.CharField(max_length=30, blank=True, null=True)
# #     seqno = models.IntegerField(blank=True, null=True)
# #     custid = models.CharField(max_length=12, blank=True, null=True)
# #     cust_mng = models.CharField(max_length=30, blank=True, null=True)
# #     telno = models.CharField(max_length=50, blank=True, null=True)
# #     email = models.CharField(max_length=100, blank=True, null=True)
# #     hpno = models.CharField(max_length=50, blank=True, null=True)
# #     contact_date = models.DateField(blank=True, null=True)
# #     predict_date = models.DateField(blank=True, null=True)
# #     competition = models.CharField(max_length=1000, blank=True, null=True)
# #     position = models.CharField(max_length=100, blank=True, null=True)
# #     detail = models.CharField(max_length=1000, blank=True, null=True)
# #     etcs = models.CharField(max_length=1000, blank=True, null=True)
# #     etc2 = models.CharField(max_length=1000, blank=True, null=True)
# #     tel_gubun = models.IntegerField(blank=True, null=True)
# #     email_gubun = models.IntegerField(blank=True, null=True)
# #     visit_gubun = models.IntegerField(blank=True, null=True)
# #     adjust_gubun = models.IntegerField(blank=True, null=True)
# #     request_gubun = models.IntegerField(blank=True, null=True)
# #     bigo = models.CharField(max_length=1000, blank=True, null=True)
# #     cnt = models.IntegerField(blank=True, null=True)
# #     entrydate = models.DateTimeField(blank=True, null=True)
# #     entryid = models.CharField(max_length=30, blank=True, null=True)
# #     moddate = models.DateTimeField(blank=True, null=True)
# #     modid = models.CharField(max_length=30, blank=True, null=True)
# #     companycode = models.CharField(unique=True, max_length=20, blank=True, null=True)
# #
# #     class Meta:
# #         managed = False
# #         db_table = 'crm_crmcompanyremark'
# #
# #
# # class CrmCrmcompanyspec(models.Model):
# #     id = models.OneToOneField(Crmcompanybaseinfo, models.DO_NOTHING, primary_key=True)
# #     custid = models.CharField(max_length=12, blank=True, null=True)
# #     mng_id = models.CharField(max_length=30, blank=True, null=True)
# #     dispatch_yn = models.IntegerField(blank=True, null=True)
# #     dispatch_capa = models.IntegerField(blank=True, null=True)
# #     agency_yn = models.IntegerField(blank=True, null=True)
# #     dogub_yn = models.IntegerField(blank=True, null=True)
# #     remark = models.CharField(max_length=1000, blank=True, null=True)
# #     entrydate = models.DateTimeField(blank=True, null=True)
# #     entryid = models.CharField(max_length=30, blank=True, null=True)
# #     moddate = models.DateTimeField(blank=True, null=True)
# #     modid = models.CharField(max_length=30, blank=True, null=True)
# #     companycode = models.CharField(unique=True, max_length=20, blank=True, null=True)
# #
# #     class Meta:
# #         managed = False
# #         db_table = 'crm_crmcompanyspec'
#
#
# class DjangoAdminLog(models.Model):
#     action_time = models.DateTimeField()
#     object_id = models.TextField(blank=True, null=True)
#     object_repr = models.CharField(max_length=200)
#     action_flag = models.PositiveSmallIntegerField()
#     change_message = models.TextField()
#     content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
#     user = models.ForeignKey('Employee', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'django_admin_log'
#
#
# class DjangoContentType(models.Model):
#     app_label = models.CharField(max_length=100)
#     model = models.CharField(max_length=100)
#
#     class Meta:
#         managed = False
#         db_table = 'django_content_type'
#         unique_together = (('app_label', 'model'),)
#
#
# class DjangoMigrations(models.Model):
#     app = models.CharField(max_length=255)
#     name = models.CharField(max_length=255)
#     applied = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_migrations'
#
#
# class DjangoSession(models.Model):
#     session_key = models.CharField(primary_key=True, max_length=40)
#     session_data = models.TextField()
#     expire_date = models.DateTimeField()
#
#     class Meta:
#         managed = False
#         db_table = 'django_session'
#
#
# class DjangoSite(models.Model):
#     domain = models.CharField(unique=True, max_length=100)
#     name = models.CharField(max_length=50)
#
#     class Meta:
#         managed = False
#         db_table = 'django_site'
#
#
# class SocialaccountSocialaccount(models.Model):
#     provider = models.CharField(max_length=30)
#     uid = models.CharField(max_length=191)
#     last_login = models.DateTimeField()
#     date_joined = models.DateTimeField()
#     extra_data = models.TextField()
#     user = models.ForeignKey('Employee', models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialaccount'
#         unique_together = (('provider', 'uid'),)
#
#
# class SocialaccountSocialapp(models.Model):
#     provider = models.CharField(max_length=30)
#     name = models.CharField(max_length=40)
#     client_id = models.CharField(max_length=191)
#     secret = models.CharField(max_length=191)
#     key = models.CharField(max_length=191)
#
#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialapp'
#
#
# class SocialaccountSocialappSites(models.Model):
#     socialapp = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING)
#     site = models.ForeignKey(DjangoSite, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialapp_sites'
#         unique_together = (('socialapp', 'site'),)
#
#
# class SocialaccountSocialtoken(models.Model):
#     token = models.TextField()
#     token_secret = models.TextField()
#     expires_at = models.DateTimeField(blank=True, null=True)
#     account = models.ForeignKey(SocialaccountSocialaccount, models.DO_NOTHING)
#     app = models.ForeignKey(SocialaccountSocialapp, models.DO_NOTHING)
#
#     class Meta:
#         managed = False
#         db_table = 'socialaccount_socialtoken'
#         unique_together = (('app', 'account'),)
#
#
# class Employee(models.Model):
#     password = models.CharField(max_length=128)
#     last_login = models.DateTimeField(blank=True, null=True)
#     email = models.CharField(unique=True, max_length=255)
#     nickname = models.CharField(max_length=25)
#     is_active = models.IntegerField()
#     is_admin = models.IntegerField()
#     phonenumber = models.CharField(max_length=25)
#     team = models.CharField(max_length=25)
#
#     def __str__(self):
#         return str(self.email)
#
#     class Meta:
#         managed = False
#         db_table = 'employee_employee'
#         verbose_name_plural = ('내부직원 / Employee')
#
#     def __str__(self):
#         return str(self.email)
#
