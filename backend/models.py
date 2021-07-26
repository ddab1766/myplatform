from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.db.models import Q
from django.conf import settings


class TimeStampedModel(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    modified_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True # 추상화, 테이블생성 x


# 공통코드 IDX
class ComIdx(models.Model):
    idx_id = models.CharField(max_length=2, primary_key=True)
    idx_name = models.CharField(max_length=50)
    idx_use = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = ('1. 공통코드 INDEX / ComIdx')

    def __str__(self):
        return self.idx_name + '(' + self.idx_id + ')'


# 상세코드
class ComCode(models.Model):
    comidx = models.ForeignKey(ComIdx, on_delete=models.CASCADE)
    code_id = models.CharField(max_length=9, primary_key=True)
    code_name = models.CharField(max_length=50)
    code_topidx = models.CharField(max_length=2, blank=True, null=True)
    code_topcd = models.CharField(max_length=9, blank=True, null=True)
    # comcode = models.ForeignKey('self', on_delete=models.CASCADE, related_name="comcode_code_topcd", null=True)
    # comcode = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    code_use = models.BooleanField(default=True)
    # code_topnm = models.ForeignKey('self', blank=True, on_delete=models.CASCADE, null=True)

    class Meta:
        verbose_name_plural = ('1_1. 상세코드 / ComCode')

    # def __init__(self, *args, **kwargs):
    #     return self.code_name

    def __str__(self):
        return self.code_name

    # def getCodeName(self):
    #     return str(self.code_name)


# 법정파견직종 코드
class ComPaCode(models.Model):
    zikcode1    = models.CharField(max_length=5, blank=True, null=True, verbose_name='직종코드1')
    zikname1    = models.CharField(max_length=200, blank=True, null=True, verbose_name='직종이름1')
    zikcode2    = models.CharField(max_length=5, blank=True, null=True, verbose_name='직종이름1')
    zikname2    = models.CharField(max_length=200, blank=True, null=True, verbose_name='직종이름1')
    zikcode3    = models.CharField(max_length=5, blank=True, null=True, verbose_name='직종이름1')
    zikname3    = models.CharField(max_length=200, blank=True, null=True, verbose_name='직종이름1')
    paname1     = models.CharField(max_length=50, blank=True, null=True, verbose_name='파견명')

    def __str__(self):
        return str(self.zikcode1) + ' ' + str(self.zikname1) + ' / ' + str(self.zikcode2) + ' '  + str(self.zikname2) + ' / ' \
               + str(self.zikcode3) + ' '   + str(self.zikname3) + ' / ' + str(self.paname1)

    class Meta:
        verbose_name_plural = ('법정파견직종코드 / ComPaCode')


class UserManager(BaseUserManager):
    def create_user(self, email, nickname, phone, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            phone=phone
            # date_of_birth=date_of_birth,
        )
        print('UserManager nickname', nickname)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nickname, password):
        user = self.create_user(
            email,
            password=password,
            nickname=nickname
            # date_of_birth=date_of_birth,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


def user_directory_path(instance, filename):
    return 'uploads/user/{}/{}'.format(str(instance.id) + '.' + instance.email, filename)


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    nickname = models.CharField(max_length=50, null=True, blank=True, verbose_name='성명')
    phone = models.CharField(max_length=13, null=True, blank=True, verbose_name='연락처')
    profile_image = models.ImageField(upload_to=user_directory_path, null=True, blank=True,
                                      verbose_name='프로필이미지',
                                      max_length=255)
    # date_of_birth = models.DateField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False, verbose_name='관리자')
    is_temp = models.BooleanField(default=False, verbose_name='임시회원')
    is_agree = models.BooleanField(default=True, verbose_name='이용약관 동의')
    is_privacy = models.BooleanField(default=True, verbose_name='개인정보취급방침 동의')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    @classmethod
    def check_profile(cls, user):
        '''
        return CompanyProfile, HrProfile instance
        '''
        from company_profile.models import CompanyProfile
        from hr_profile.models import HrProfile
        try:
            companyprofile = CompanyProfile.objects.get(user=user)
        except CompanyProfile.DoesNotExist:
            companyprofile = None

        try:
            hrprofile = HrProfile.objects.get(user=user)
        except HrProfile.DoesNotExist:
            hrprofile = None

        return companyprofile, hrprofile

    class Meta:
        verbose_name_plural = ('2. 사용자 / User')

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def alarm_count(self):
        try:
            return self.alarm.filter(is_read=False, receiver=self).all().count()
        except:
            return 0

    @property
    def is_staff(self):
        return self.is_admin


def limit_jikjong_choices(self):
    return Q(comidx='AA') & Q(code_topcd__endswith='00000')

def limit_jikjong_low_choices(self):
    return Q(comidx='AA') & ~Q(code_topcd__endswith='00000') & ~Q(code_topcd=None)


# 직종(중) 테이블
class Jikjong(models.Model):
    jikjong_mid         = models.OneToOneField(ComCode, on_delete=models.CASCADE, verbose_name='직종(중)', primary_key=True,
                                               limit_choices_to=limit_jikjong_choices(''), null=False)
    jikjong_comment     = models.TextField(max_length=500, blank=True, null=True, verbose_name='직종(중) 설명')
    # dispatch_use        = models.BooleanField(default=True, verbose_name='파견사용 유무')

    class Meta:
        # unique_together = (("jikjong_mid", "jikjong_low"),)
        verbose_name_plural = ('직종(중) / Jikjong')

    def __str__(self):
        return self.jikjong_mid.code_name

# 직종(소) 테이블
class JikjongLow(models.Model):
    jikjong_low     = models.OneToOneField(ComCode, on_delete=models.CASCADE, verbose_name='직종(소)', null=False,
                                           limit_choices_to=limit_jikjong_low_choices(''))
    compacode       = models.ForeignKey(ComPaCode, on_delete=models.CASCADE, verbose_name='법정파견코드', null=True, blank=True)

    class Meta:
        # unique_together = (("jikjong_mid", "jikjong_low"),)
        verbose_name_plural = ('직종(소) / JikJongLow')

    def __str__(self):
        return self.jikjong_low.code_name

# 질문
class Question(models.Model):
    jikjong_mid         = models.ForeignKey(ComCode, on_delete=models.CASCADE, verbose_name='직종(중)', null=True,
                                            limit_choices_to=limit_jikjong_choices(''), related_name='question_jikjong_mid')
    jikjong_low         = models.ForeignKey(ComCode, on_delete=models.CASCADE, verbose_name='직종(소)', null=True, blank=True,
                                            limit_choices_to=limit_jikjong_low_choices(''))
    # jikjong_low         = ChainedForeignKey(ComCode, chained_field='jikjong_mid', chained_model_field='jikjong_mid',
    #                                         show_all=False, auto_choose=True, sort=True)
    question_gubun      = models.ForeignKey(ComCode, on_delete=models.CASCADE, verbose_name='질문구분',
                                            limit_choices_to={'comidx':'CD'}, related_name='question_gubun', null=True)
    question_comment    = models.CharField(max_length=100, blank=True, null=True, verbose_name='질문')
    question_use_yn     = models.BooleanField(default=True, verbose_name='사용유무')

    class Meta:
        # unique_together = ( ("jikjong_mid", "question_gubun", "question", "answer"),)
        verbose_name_plural = ('직종별질문 / Question')

    def __str__(self):
        return str(self.jikjong_mid)  + ' > ' + str(self.question_comment)


# 답변
class Answer(models.Model):
    question            = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name='질문', null=False,
                                            limit_choices_to=~Q(question_comment=None))
    answer_type         = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='answer_type', verbose_name='답변유형',
                                            limit_choices_to={'comidx': 'CE', 'code_topcd': None}, null=True)
    # answer_type_comment = models.CharField(max_length=100, verbose_name='유형답변', null=True, blank=True)
    answer_comment      = models.CharField(max_length=1000, verbose_name='답변', null=True, blank=True)
    answer_use_yn       = models.BooleanField(default=True, verbose_name='사용유무')
    answer_placeholder  = models.CharField(max_length=1000, verbose_name='placeholder', null=True, blank=True)

    class Meta:
        unique_together = (("question", "answer_type", "answer_comment" ),)
        verbose_name_plural = ('직종별답변 / Answer')

    def __str__(self):
        return self.question.jikjong_mid.code_name + '/' + self.question.question_comment + '/' + str(self.answer_comment)

# HR담당자
# class HrUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="hruserprofile")
#     emp_no = models.CharField(max_length=8, blank=True, null=True)
#
#     def __str__(self):
#         return self.emp_no
#
#     class Meta:
#         verbose_name_plural = ('HR담당자 / HrUser')


# 기업기본정보
class CompanyBaseInfo(models.Model):
    custid             = models.CharField(max_length=13, blank=True, null=True, verbose_name='사업자번호')
    subject            = models.CharField(max_length=10, blank=True, null=True, verbose_name='종목')
    main_category      = models.CharField(max_length=2, blank=True, null=True, verbose_name='업종대분류')
    mid_category       = models.CharField(max_length=3, blank=True, null=True, verbose_name='업종중분류')
    detail1_category   = models.CharField(max_length=4, blank=True, null=True, verbose_name='세분류1')
    detail2_category   = models.CharField(max_length=5, blank=True, null=True, verbose_name='세분류2')
    com_name           = models.CharField(max_length=100, blank=True, null=True, verbose_name='회사명')
    stock_code         = models.CharField(max_length=6, blank=True, null=True, verbose_name='거래소코드')
    finance_year       = models.CharField(max_length=6, blank=True, null=True, verbose_name='회계년도')
    group_name         = models.CharField(max_length=100, blank=True, null=True, verbose_name='그룹사명')
    com_telno          = models.CharField(max_length=20, blank=True, null=True, verbose_name='전화번호')
    com_addr           = models.CharField(max_length=300, blank=True, null=True, verbose_name='주소')
    found_date         = models.CharField(max_length=8, blank=True, null=True, verbose_name='설립일')
    website            = models.CharField(max_length=50, blank=True, null=True, verbose_name='홈페이지')
    emp_count          = models.CharField(max_length=10, blank=True, null=True, verbose_name='사원수')
    gross_total        = models.IntegerField(blank=True, null=True, verbose_name='매출액')

    def __str__(self):
        return self.com_name

    class Meta:
        verbose_name_plural = ('기업기본정보 / CompanyBaseInfo')


# 공지사항
class Notification(TimeStampedModel):
    noti_category   = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True,
                                        verbose_name='카테고리', related_name='noti_category',
                                        limit_choices_to={'comidx': 'ZA', 'code_topcd': None})
    noti_level      = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True,
                                        verbose_name='알림 레벨', related_name='noti_level',
                                        limit_choices_to={'comidx': 'ZB', 'code_topcd': None})
    noti_event      = models.CharField(max_length=1000, blank=True, null=True, verbose_name='이벤트 내용 및 작업 내용')
    # test    = models.CharField(max_length=11, null=True)

    def __str__(self):
        return self.noti_event

    class Meta:
        verbose_name_plural = ('공지사항 / Notification')


# 알림
class Alarm(TimeStampedModel):
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False,
                                 verbose_name='받는사람', related_name='alarm')
    alarm_gubun = models.ForeignKey(ComCode, on_delete=models.SET_NULL, null=True, blank=True,
                                    limit_choices_to={'comidx': 'ZE', 'code_topcd': None})
    title = models.CharField(max_length=200, null=True, blank=True)
    contents = models.TextField(max_length=3000, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    link_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ('-created_time', )
        verbose_name_plural = ('알림 / Alarm')


# 문의사항
class Qna(TimeStampedModel):
    qna_email = models.EmailField(max_length=254, null=False, blank=False, verbose_name='이메일주소')
    qna_phone = models.CharField(max_length=30, null=True, blank=True, verbose_name='연락처')
    qna_title = models.CharField(max_length=100, null=False, blank=False, verbose_name='제목')
    qna_text = models.TextField(max_length=500, null=False, blank=False, verbose_name='설명')
    qna_attach = models.FileField(upload_to=settings.UPLOAD_ROOT + '/qna/', null=True, verbose_name='첨부파일')

    def __str__(self):
        return self.qna_title

    class Meta:
        verbose_name_plural = ('문의사항 / Qna')


# FAQ
class FAQ(TimeStampedModel):
    faq_gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=False, blank=False, verbose_name='구분값',
                                  limit_choices_to={'comidx': 'ZC', 'code_topcd': None})
    faq_title = models.CharField(max_length=100, null=False, blank=False, verbose_name='제목')
    faq_text = models.TextField(max_length=1000, null=False, blank=False, verbose_name='설명')

    def __str__(self):
        return self.faq_title

    class Meta:
        verbose_name_plural = ('FAQ')


class Point(models.Model):
    sugub_review = models.ForeignKey('company_profile.SugubReview', on_delete=models.CASCADE, blank=True, null=True,
                                     verbose_name='수급리뷰', related_name='sugubreview_point')
    point_gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE,
                                    limit_choices_to={'comidx': 'ZD', 'code_topcd': None},
                                    blank=True, null=True, verbose_name='별점 항목')
    point = models.IntegerField(null=True, verbose_name='별점')

    class Meta:
        verbose_name_plural = ('별점 / Point')


class AlarmSetting(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, verbose_name='사용자',
                              related_name='alarm_settings')
    alarm_code = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, verbose_name='알림유형',
                                   limit_choices_to={'comidx': 'ZH', 'code_topcd': None},)
    allow_email = models.BooleanField(default=False)
    allow_fcm = models.BooleanField(default=False)
    allow_kakao = models.BooleanField(default=False)
    allow_sms = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = ('2_1. 알람설정 / AlarmSetting')
