from django.db import models
from django.conf import settings
from django_mysql.models import JSONField
from django.db.models import Q
import datetime, os

from backend.models import TimeStampedModel, ComCode, User, Answer


class UserProfile(TimeStampedModel):
    user              = models.OneToOneField(User, on_delete=models.CASCADE, related_name='userprofile')
    username          = models.CharField(max_length=100, null=True, verbose_name='성명')
    phone             = models.CharField(max_length=13, null=True, verbose_name='연락처')
    date_of_birth     = models.CharField(max_length=10, blank=True, null=True, verbose_name='생년월일')
    education_level   = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, related_name='education_level',
                                          limit_choices_to={'comidx': 'BX', 'code_topcd': None}, verbose_name='최종학력')
    career_gb         = models.CharField(max_length=9, blank=True, null=True, verbose_name='경력구분')
    career_gigan      = models.IntegerField(blank=True, null=True, verbose_name='경력기간')
    salary            = models.IntegerField(blank=True, null=True, verbose_name='최종연봉')
    hope_site         = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                          limit_choices_to={'comidx':'BE', 'code_topcd':None}, verbose_name='희망근무지')
    address           = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, related_name='address',
                                          limit_choices_to={'comidx': 'BE', 'code_topcd': None}, verbose_name='사는곳')
    website           = models.URLField(blank=True, null=True, verbose_name='웹사이트')
    about             = models.CharField(max_length=255, blank=True, null=True, verbose_name='간단자기소개글')
    gender            = models.CharField(max_length=1, blank=True, null=True, verbose_name='성별')
    recuser           = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True,
                                          null=True, related_name='recuser', verbose_name='추천인')
    balance           = models.IntegerField(default=0, verbose_name='채공머니')
    status            = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, related_name='status',
                                          limit_choices_to={'comidx': 'BB', 'code_topcd': None}, verbose_name='구직상태',
                                          default='BB0200000')

    class Meta:
        verbose_name_plural = ('1. 사용자 프로필 / UserProfile')


# 전문분야
class UserSpecial(TimeStampedModel):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userspecial')
    jikjong_top             = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx':'AA', 'code_topcd': None},
                                                verbose_name='직종코드(대)', related_name='userspecial_jikjong_top')
    jikjong_mid             = models.ForeignKey(ComCode, on_delete=models.CASCADE, null=True, blank=True,
                                                limit_choices_to={'comidx': 'AA'},
                                                verbose_name='직종코드(중)', related_name="userspecial_jikjong_mid")
    jikjong_low             = models.ManyToManyField(ComCode, blank=True, related_name="userspecial_jikjong_low", verbose_name='직종코드(소)',
                                                     limit_choices_to=Q(comidx='AA') & ~Q(code_topcd__endswith='00000') & ~Q(code_topcd=None))
    career_gigan            = models.IntegerField(blank=True, null=True, verbose_name='경력기간')
    salary_gb               = models.CharField(max_length=9, blank=True, null=True, verbose_name='급여코드(AI)')
    currency_gb             = models.CharField(max_length=9, blank=True, null=True, verbose_name='통화코드(BQ)')
    salary_amt              = models.IntegerField(blank=True, null=True, verbose_name='금액')
    hope_salary             = models.IntegerField(blank=True, null=True, verbose_name='희망연봉')
    urlkey                  = models.CharField(max_length=9, blank=True, null=True)                                     # URL Key
    # except_company          = models.ManyToManyField(ComCode, blank=True, related_name="except_company", verbose_name='제외기업')
    open_yn                 = models.BooleanField(default=True, verbose_name='공개여부')
    answers_json            = JSONField(null=True)

    class Meta:
        verbose_name_plural = ('2. 전문분야 / UserSpecial')
        ordering = ['-created_time']


def resume_directory_path(instance, filename):
    return 'uploads/resume/{}/'.format(instance.resume_phone + '_' + instance.resume_username + '_' + filename)


# 이력서
class Resume(models.Model):
    userspecial             = models.ForeignKey(UserSpecial, on_delete=models.CASCADE, blank=True, null=True,
                                                related_name='resume')
    resume_title            = models.CharField(max_length=50, blank=True, null=True,
                                               default='이력서 제목', verbose_name='이력서 제목')
    resume_username         = models.CharField(max_length=100, blank=True, null=True, verbose_name='이력서 사용자이름')
    resume_phone            = models.CharField(max_length=13, blank=True, null=True, verbose_name='이력서 연락처')
    resume_birth            = models.CharField(max_length=10, blank=True, null=True, verbose_name='이력서 생년월일')
    resume_status           = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, verbose_name='이력서 상태')
    introduce               = models.TextField(max_length=500, blank=True, null=True, verbose_name='이력서 자기소개')
    entry_date              = models.DateTimeField(auto_now=False, null=True,
                                                   default=datetime.datetime.now, verbose_name='이력서 등록일')
    modify_date             = models.DateTimeField(auto_now=False, null=True,
                                                   default=datetime.datetime.now, verbose_name='이력서 최종수정일')
    open_yn                 = models.BooleanField(default=False, verbose_name='이력서 공개여부')
    except_company          = models.ManyToManyField(ComCode, blank=True, verbose_name='이력서 제외기업',
                                                     related_name="resume_except_company")
    urlkey                  = models.CharField(max_length=9, blank=True, null=True)                                     # 이력서 URLKEY
    resume_file             = models.FileField(upload_to=resume_directory_path, null=True)
    resume_filename         = models.CharField(max_length=100, null=True, verbose_name='파일명')
    # companyprofile          = models.ForeignKey("company_profile.CompanyProfile", on_delete=models.SET_NULL,
    #                                             blank=True, null=True, verbose_name='등록한회사',
    #                                             default=1) # 겟스로우
    hrprofile               = models.ForeignKey("hr_profile.HrProfile", on_delete=models.SET_NULL,
                                                blank=True, null=True, verbose_name='등록한회사',
                                                default=None, related_name='hrprofile_resume')  # 겟스로우

    class Meta:
        verbose_name_plural = ('3 .이력서 / Resume')

    def __str__(self):
        return str(self.resume_title)

    # def save(self, *args, **kwargs):
    #     if self.id is None:
    #         temp_image = self.resume_file
    #         self.resume_file = None
    #         super().save(*args, **kwargs)
    #         # instance.resume_file = temp_image
    #         # instance.save()
    #         self.resume_file = temp_image
        # super().save(*args, **kwargs)
        # instance.


# 경력
class Career(models.Model):
    resume                  = models.ForeignKey(Resume, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='이력서', related_name='careers')
    career_start            = models.CharField(max_length=6, blank=True, null=True, verbose_name='경력 시작')
    career_end              = models.CharField(max_length=6, blank=True, null=True, verbose_name='경력 종료')
    career_company          = models.CharField(max_length=50, blank=True, null=True, verbose_name='회사명')
    career_dpt_name         = models.CharField(max_length=50, blank=True, null=True, verbose_name='부서명')
    career_work_role        = models.CharField(max_length=1000, blank=True, null=True, verbose_name='담당업무')

    class Meta:
        verbose_name_plural = ('3_1. 경력사항 / Career')

# 학력
class Education(models.Model):
    resume                  = models.ForeignKey(Resume, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='이력서', related_name='educations')
    education_start         = models.CharField(max_length=6, blank=True, null=True, verbose_name='학력 시작')
    education_end           = models.CharField(max_length=6, blank=True, null=True, verbose_name='학력 종료')
    school_code             = models.CharField(max_length=9, blank=True, null=True, verbose_name='학교 코드')
    major_detail            = models.CharField(max_length=1000, blank=True, null=True, verbose_name='주요 전공')

    class Meta:
        verbose_name_plural = ('3_2. 학력사항 / Education')

# 어학(외국어)
class Language(models.Model):
    resume          = models.ForeignKey(Resume, on_delete=models.CASCADE, blank=True, null=True, verbose_name='이력서',
                                        related_name='languages')
    language        = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, verbose_name='언어',
                                        limit_choices_to={'comidx':'AV', 'code_topcd': None},)
    language_level  = models.CharField(max_length=50, blank=True, null=True, verbose_name='언어 수준')

    class Meta:
        verbose_name_plural = ('외국어 / Language')


# 광고URL
class UserAdvKey(models.Model):
    from company_profile.models import JobAdvertise
    jobadvertise            = models.ForeignKey(JobAdvertise, on_delete=models.CASCADE, blank=True, null=True, verbose_name='채용공고')
    user                    = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='사용자')
    hash                    = models.CharField(max_length=8, blank=False, null=False, verbose_name='해쉬값')
    url                     = models.URLField(blank=False, null=False, verbose_name='단축 URL')
    orgUrl                  = models.URLField(blank=False, null=False, verbose_name='Original URL')

    class Meta:
        unique_together = (("jobadvertise", "user"),)
        verbose_name_plural = ('광고URL / UserAdvKey')

# 기업광고URL
class CompanyAdvKey(models.Model):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='사용자')
    hash                    = models.CharField(max_length=8, blank=False, null=False, verbose_name='해쉬값')
    url                     = models.URLField(blank=False, null=False, verbose_name='단축 URL')
    orgUrl                  = models.URLField(blank=False, null=False, verbose_name='Original URL')

    class Meta:
        verbose_name_plural = ('기업광고URL / CompanyAdvKey')


# 관심채용공고
class InterestAdv(models.Model):
    from company_profile.models import JobAdvertise
    jobadvertise            = models.ForeignKey(JobAdvertise, on_delete=models.CASCADE, blank=True, null=True, verbose_name='채용공고')
    user                    = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='사용자', related_name='interestadv')
    # PK설정

    class Meta:
        verbose_name_plural = ('관심공고 / InterestAdv')

# 관심수급
class InterestSugub(models.Model):
    sugub = models.ForeignKey('company_profile.sugub', on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False,
                             related_name='interestsugub_user')

    class Meta:
        verbose_name_plural = ('관심수급 / InterestSugub')

# 사용자 계좌
# class UserAccount(TimeStampedModel):
#     user            = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='User')
#     bankCode        = models.CharField(max_length=50, null=False, blank=False, verbose_name='은행코드')
#     account_number  = models.CharField(max_length=50, null=False, blank=False, verbose_name='계좌번호')

# 사용자포인트
class UserPoint(TimeStampedModel):
    user            = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='User',
                                        related_name='userpoint')
    poi_type        = models.ForeignKey(ComCode, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='포인트 종류',
                                        limit_choices_to={'comidx':'GA', 'code_topcd': None},)
    poi_content     = models.CharField(max_length=50, null=True, blank=True, verbose_name='포인트 내용')
    poi_point       = models.IntegerField(default=0, verbose_name='포인트 점수')
    poi_remain      = models.IntegerField(default=0, verbose_name='남은 포인트')

    # bank            = models.CharField(max_length=50, null=False, blank=False, verbose_name='은행코드')
    # account_number  = models.CharField(max_length=50, null=False, blank=False, verbose_name='계좌번호')
    # deposit         = models.IntegerField(blank=True, null=True, verbose_name='입금액')
    # withdraw        = models.IntegerField(blank=True, null=True, verbose_name='출금액')
    # balance         = models.IntegerField(blank=True, null=True, verbose_name='잔액')

    class Meta:
        verbose_name_plural = ('4. 사용자포인트 / UserPoint')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.set_point(self.user, self.poi_point)

    def set_point(self, user, point):
        obj = UserProfile.objects.get(user=user)
        print('set_point obj',obj)
        obj.balance += point
        print('set_point obj.balance',obj.balance)
        obj.save()

# 코멘트
class UserComment(TimeStampedModel):
    from company_profile.models import JobAdvertise
    user            = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='유저', related_name='userComment_user')
    jobadvertise    = models.ForeignKey(JobAdvertise, on_delete=models.CASCADE, blank=True, null=True, verbose_name='채용공고', related_name='userComment_jobad')
    review_comment  = models.TextField(max_length=500, null=True, blank=True, verbose_name='리뷰')
    review_point    = models.IntegerField(blank=True, null=True, verbose_name='별점')
    write_id        = models.TextField(max_length=50, null=True, blank=True, verbose_name='작성자')

    class Meta:
        verbose_name_plural = ('5. 리뷰 / Review')