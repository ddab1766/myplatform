from django.db import models
from django.contrib.auth import get_user_model
from backend.models import User, ComIdx, ComCode
import datetime, os
from django_mysql.models import JSONField
from django.db.models import Q, Avg
from user_profile.models import Resume
from django.conf import settings
from backend.models import TimeStampedModel
from hr_profile.models import HrProfile


def company_directory_path(instance, filename):
    return 'uploads/company/{}/{}'.format(str(instance.id) + '.' + instance.custname, filename)


class CompanyProfile(TimeStampedModel):
    user                = models.ManyToManyField(User, related_name="companyprofile")
    custname            = models.CharField(max_length=100, blank=True, null=True, verbose_name='회사명')
    custid              = models.CharField(max_length=13, blank=True, null=True, verbose_name='사업자번호')
    gross_total         = models.IntegerField(blank=True, null=True, verbose_name='매출액')
    homepage            = models.CharField(max_length=100, blank=True, null=True, verbose_name='홈페이지')
    introduce           = models.TextField(max_length=10000, blank=True, null=True, verbose_name='간단소개글')
    status_cd           = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, verbose_name='승인상태',
                                            limit_choices_to={'comidx': 'CB'}, default='CB0100000')
    cmp_manager         = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='cmp_manager',
                                            # db_constraint=False,
                                            limit_choices_to={'is_admin': True},
                                            blank=True, null=True, verbose_name='담당매니저')
    upjong              = models.CharField(max_length=9, blank=True, null=True, verbose_name='업종')
    stock_gubun         = models.CharField(max_length=1, blank=True, null=True, verbose_name='상장구분')
    group_company       = models.CharField(max_length=50, blank=True, null=True, verbose_name='그룹사')
    load_addr_code      = models.CharField(max_length=5, blank=True, null=True, verbose_name='주소(도로명코드)')
    load_addr           = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소(도로명주소)')
    load_addr_detail    = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소 상세')
    post_addr_code      = models.CharField(max_length=5, blank=True, null=True, verbose_name='주소(우편번호')
    post_addr           = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소(지번주소)')
    post_addr_detail    = models.CharField(max_length=50, blank=True, null=True, verbose_name='주소 상세')
    nation              = models.CharField(max_length=9, blank=True, null=True, verbose_name='국가')
    emp_count           = models.IntegerField(blank=True, null=True, verbose_name='임직원수')
    manager_email       = models.CharField(max_length=30, blank=True, null=True, verbose_name='대표 이메일')
    manager_phone       = models.CharField(max_length=11, blank=True, null=True, verbose_name='대표 연락처')
    company_recuser     = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True,
                                            null=True, related_name='companyrecuser', verbose_name='추천인')
    # company_form        = models.ForeignKey(ComCode, on_delete=models.SET_NULL, blank=True, null=True, related_name='company_form',
    #                                         limit_choices_to={'comidx': 'CF'}, verbose_name='기업형태', default='CF0100000')
    company_image       = models.ImageField(upload_to=company_directory_path, null=True, blank=True, verbose_name='회사대표이미지')
    company_logo        = models.ImageField(upload_to=company_directory_path, null=True, blank=True, verbose_name='회사로고')
    ticket              = models.IntegerField(default=0, verbose_name='티켓')

    def __str__(self):
        return str(self.custname)

    def set_ticket(self, ticket):
        self.ticket += ticket
        # print('남은 티켓:', self.ticket)

    def use_ticket(self, ticket):
        # todo ticket < 0 에러
        self.ticket -= ticket
        # print('남은 티켓:', self.ticket)

    @property
    def coworker_list(self):
        return self.company_coworker.all()

    @property
    def sugub_count(self):
        return self.company_sugub.all().count()

    class Meta:
        verbose_name_plural = ('1. 회사 프로필 / CompanyProfile')


def company_directory_path(instance, filename):
    if isinstance(instance, CompanyProfile):
        return 'uploads/company/{}/{}'.format(str(instance.id) + '.' + instance.custname, filename)
    else:
        return 'uploads/company/{}/{}'.format(str(instance.companyprofile.id) + '.' + instance.companyprofile.custname, filename)


class CompanyImage(TimeStampedModel):
    companyprofile   = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='companyprofile_image')
    companyprofile_image    = models.ImageField(upload_to=company_directory_path,  null=True, blank=True,
                                                verbose_name='회사 이미지')

    class Meta:
        verbose_name_plural = ('회사 이미지 / HrImage')

    def hr_image_filename(self):
        return os.path.basename(self.companyprofile_image.name)

# 기업프로필 동료
class CompanyProfileCoWorker(TimeStampedModel):
    companyprofile      = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, blank=True, null=True,
                                            verbose_name='회사프로필', related_name='company_coworker')
    user                = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='User',
                                            related_name='companyprofilecoworker')
    companyprofile_auth = models.ForeignKey(ComCode, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='기업권한',
                                            limit_choices_to={'comidx':'CG'}, default='CG0200000')
    coworker_phone      = models.CharField(max_length=11, null=True, blank=True, verbose_name='연락처')

    def __str__(self):
        return str(self.companyprofile_auth)

    class Meta:
        verbose_name_plural = ('1_1. 회사동료 / CompanyProfileCoWorker')


# 수급의뢰서 테이블
class Sugub(TimeStampedModel):
    user                    = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                                                related_name='user_sugub',
                                                verbose_name='의뢰자')
    companyprofile          = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, blank=True, null=True,
                                                related_name='company_sugub',
                                                verbose_name='companyprofile')
    custid                  = models.CharField(max_length=13, blank=True, null=True, verbose_name='사업자번호')
    chae_cd                 = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx': 'AC', 'code_topcd': None},
                                                verbose_name='채용형태')
    # chae_cd_name            = models.CharField(max_length=9, blank=True, null=True, verbose_name='채용형태TEST')
    chae_gigan              = models.IntegerField(blank=True, null=True, verbose_name='계약기간')
    chae_gigan_type         = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx': 'AE', 'code_topcd': None},
                                                verbose_name='계약기간타입', related_name='chae_gigan_type')
    sugub_title             = models.CharField(max_length=50, blank=True, null=True, verbose_name='수급제목')
    sugub_end_dt            = models.DateField(blank=True, null=True, verbose_name='채용마감일')
    sugub_jikjong_top       = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx': 'AA', 'code_topcd': None},
                                                verbose_name='직종코드(대)', related_name='sugub_jikjong_top')
    sugub_jikjong_mid       = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx': 'AA'},
                                                verbose_name='직종코드(중)', related_name='sugub_jikjong_mid')
    sugub_jikjong_low       = models.ManyToManyField(ComCode, blank=True, related_name="sugub_jikjong_low",
                                                     limit_choices_to={'comidx': 'AA'},
                                                     verbose_name='직종코드(소)')
    sugub_career_gb         = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                limit_choices_to={'comidx': 'AB', 'code_topcd': None, 'code_use': True},
                                                verbose_name='경력코드', related_name='sugub_career_gb')
    career_start            = models.IntegerField(blank=True, null=True, verbose_name='경력시작')
    career_end              = models.IntegerField(blank=True, null=True, verbose_name='경력종료')
    work_role               = models.TextField(max_length=5000, null=True, verbose_name='담당업무')
    work_position           = models.CharField(max_length=50, null=True, verbose_name='포지션')
    education_cd            = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, 
                                                verbose_name='학력코드',
                                                limit_choices_to={'comidx': 'AO', 'code_topcd': None, 'code_use': True},
                                                related_name='education_cd')
    # sugub_gender            = models.CharField(max_length=9, null=True, verbose_name='선호성별')
    sugub_gender            = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='선호성별', default='AQ0300000',
                                                limit_choices_to={'comidx': 'AQ', 'code_topcd': None},
                                                related_name='sugub_gender')
    age_start               = models.IntegerField(blank=True, null=True, verbose_name='시작나이')
    age_end                 = models.IntegerField(blank=True, null=True, verbose_name='종료나이')
    work_address            = models.ForeignKey(ComCode, on_delete=models.SET_NULL, related_name='work_address',
                                                limit_choices_to={'comidx': 'BE', 'code_use': True},
                                                null=True, blank=True, verbose_name='지역(BE)'
                                                )
    work_load_addr_code     = models.CharField(max_length=5, blank=True, null=True, verbose_name='실근무지(도로명코드)')
    work_load_addr          = models.CharField(max_length=100, blank=True, null=True, verbose_name='실근무지(도로명주소)')
    work_load_addr_detail   = models.CharField(max_length=500, blank=True, null=True, verbose_name='실근무지(도로명상세)')
    work_post_addr_code     = models.CharField(max_length=5, blank=True, null=True, verbose_name='실근무지(우편번호)')
    work_post_addr          = models.CharField(max_length=100, blank=True, null=True, verbose_name='실근무지(우편주소)')
    work_post_addr_detail   = models.CharField(max_length=500, blank=True, null=True, verbose_name='실근무지(우편상세)')
    salary_gubun            = models.ForeignKey(ComCode, on_delete=models.SET_NULL, related_name='salary_gubun',
                                                limit_choices_to={'comidx': 'AI', 'code_use': True},
                                                null=True, blank=True, verbose_name='급여형태(AI)')
    salary_start            = models.IntegerField(blank=True, null=True, verbose_name='최소급여')
    salary_end              = models.IntegerField(blank=True, null=True, verbose_name='최대급여')
    bokri                   = models.TextField(max_length=5000, blank=True, null=True, verbose_name='복리후생')

    # jikname                 = models.CharField(max_length=20, null=True, blank=True, verbose_name='직무')
    spec                    = models.TextField(max_length=5000, null=True, blank=True, verbose_name='필수/우대사항')
    wrk_condition           = models.TextField(max_length=5000, null=True, blank=True, verbose_name='근무조건')
    sugub_status            = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='sugub_status',
                                                limit_choices_to={'comidx': 'CC', 'code_topcd': None},
                                                default='CC0100000',
                                                null=True, blank=True, verbose_name='수급진행상태')
    created_at              = models.DateTimeField(auto_now=False, auto_now_add=True, verbose_name='요청시간')
    manager                 = models.ForeignKey(User, on_delete=models.CASCADE,
                                                # db_constraint=False,
                                                limit_choices_to={'is_admin': True},
                                                blank=True, null=True, verbose_name='수급담당자')

    apply_gubun             = models.CharField(max_length=9, null=True, blank=True, verbose_name='접수기간구분(AY)')
    submit_doc              = models.CharField(max_length=9, null=True, blank=True, verbose_name='지원서양식(AZ)')
    work_dept               = models.CharField(max_length=50, null=True, blank=True, verbose_name='근무부서')
    # position_name           = models.CharField(max_length=9, null=True, blank=True)                                     # 포지션명
    hire_count              = models.IntegerField(blank=True, null=True, verbose_name='채용인원수')
    # hire_type               = models.CharField(max_length=9, null=True, blank=True, verbose_name='고용형태(AD)')
    hire_type               = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='hire_type',
                                                limit_choices_to={'comidx': 'AD', 'code_topcd': None},
                                                null=True, blank=True, verbose_name='고용형태(AD)')
    # cont_month              = models.IntegerField(blank=True, null=True, verbose_name='개월수')
    # cont_term_gubun         = models.CharField(max_length=9, null=True, blank=True, verbose_name='계약기간구분(AE)')
    cont_chg_gb             = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='cont_chg_gb',
                                                limit_choices_to={'comidx': 'AF', 'code_topcd': None},
                                                null=True, blank=True, verbose_name='전환여부(AF)')
    work_type               = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='work_type',
                                                limit_choices_to={'comidx': 'AG', 'code_topcd': None},
                                                null=True, blank=True, verbose_name='근무형태(AG)')
    work_type_comment       = models.CharField(max_length=100, null=True, blank=True, verbose_name='근무요일(직접)')
    # working_days            = models.ManyToManyField(ComCode, blank=True, limit_choices_to={'comidx':'AH'},
    #                                                  verbose_name='근무일', related_name="working_days")
    work_time_start         = models.CharField(max_length=4, null=True, blank=True, verbose_name='근무시작시간')
    work_time_end           = models.CharField(max_length=4, null=True, blank=True, verbose_name='근무종료시간')
    work_rest_start         = models.CharField(max_length=4, null=True, blank=True, verbose_name='휴게시작시간')
    work_rest_end           = models.CharField(max_length=4, null=True, blank=True, verbose_name='휴게종료시간')
    work_rest_comment       = models.TextField(max_length=1000, null=True, blank=True, verbose_name='근무시간 기타사항')
    # salary_gubun            = models.CharField(max_length=9, null=True, blank=True, verbose_name='급여코드(AI)')
    salary_term             = models.CharField(max_length=9, null=True, blank=True, verbose_name='급여범위코드')
    work_site_gubun         = models.CharField(max_length=9, null=True, blank=True, verbose_name='근무지코드(AK)')
    # work_near_site          = models.ManyToManyField(ComCode, blank=True, limit_choices_to={'comidx': 'AL'},
    #                                                  related_name="work_near_site", verbose_name='인근지역(AL)')
    work_house_gubun        = models.BooleanField(default=False, verbose_name='재택가능구분')
    work_near_subway        = models.CharField(max_length=9, null=True, blank=True, verbose_name='인근지하철(AM)')
    work_traffic            = models.TextField(max_length=1000, null=True, blank=True, verbose_name='교통편상세')
    sugub_salary_adjust     = models.BooleanField(default=True, verbose_name='급여협의')
    etc                     = models.TextField(max_length=2000, null=True, blank=True, verbose_name='기타 특이사항')
    ot_daily                = models.IntegerField(default=0, verbose_name='포괄임금(연장)')
    ot_daily_yn             = models.BooleanField(verbose_name='포괄임금(연장) 유무', default=False)
    ot_night                = models.IntegerField(default=0, verbose_name='포괄임금(야간)')
    ot_night_yn             = models.BooleanField(verbose_name='포괄임금(야간) 유무', default=False)
    ot_holiday              = models.IntegerField(default=0, verbose_name='포괄임금(휴일)')
    ot_holiday_yn           = models.BooleanField(verbose_name='포괄임금(휴일) 유무', default=False)


    def __str__(self):
        return str(self.work_position)

    @property
    def estimated_price(self): # 예상금액
        if self.salary_gubun_id == 'AI0100000': #연봉
            if self.chae_gigan is None:
                self.chae_gigan = 12
            # 연봉범위 평균값 / 12개월  * 계약개월수
            try:
                return round((self.salary_start + self.salary_end ) / 2 / 12 * self.chae_gigan ) * 10000
            except:
                return 0
        elif self.salary_gubun_id == 'AI0200000': #월급
            # 월급범위 평균값 * 계약개월수
            try:
                return round((self.salary_start + self.salary_end) / 2) * self.chae_gigan
            except:
                return 0

    @property
    def percentage(self): # 작성 완성도
        count = 0
        for i in self._meta.fields:
            if i.value_from_object(self) is None:
                count += 1
        return round(round(1 - (count / len(self._meta.fields)), 2) * 100)

    @property
    def applicants_count(self):
        try:
            return self.jobadvertise.get().jobapplicants.count()
        except:
            return 0

    @property
    def estimated_earnings(self): # 예상수익금
        if self.chae_cd_id == 'AC0100000': # 파견
            return round(self.estimated_price * 7 / 100)
        elif self.chae_cd_id == 'AC0300000': # 채대
            return round(self.estimated_price * 15 / 100)

    class Meta:
        verbose_name_plural = ('2. 수급의뢰서 / Sugub')


class SugubSign(TimeStampedModel):
    sugub = models.ForeignKey(Sugub, on_delete=models.CASCADE, blank=True, null=True, verbose_name='채용의뢰서',
                              related_name='sugub_sugubsign')
    sign_code = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, verbose_name='결재상태',
                                  limit_choices_to={'comidx': 'CJ', 'code_topcd': None})
    sanctioner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='결재자',
                                   related_name='sanctioner_sugubsign')
    # hrprofile = models.ForeignKey(HrProfile, on_delete=models.CASCADE, blank=True, null=True, verbose_name='HR회사')
    damdang = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='담당자',
                                related_name='damdang_sugubsign')

    class Meta:
        verbose_name_plural = ('2_1. 수급결재&담당 / SugubSign')


# 채용공고 -> 요청사항으로 변경..
class JobAdvertise(TimeStampedModel):
    sugub                   = models.ForeignKey(Sugub, on_delete=models.CASCADE, blank=True, null=True,
                                                related_name='jobadvertise'
                                                )
    jobadvertise_title      = models.TextField(max_length=50, blank=True, null=True, verbose_name='공고제목')
    company_name            = models.CharField(max_length=50, null=True, verbose_name='회사명')
    company_introduce       = models.TextField(max_length=500, blank=True, null=True, verbose_name='회사소개')
    company_name_yn         = models.BooleanField(default=False, verbose_name='회사명 비공개')
    main_work               = models.TextField(max_length=500, null=True, verbose_name='주요업무')
    main_work_yn            = models.BooleanField(default=False, verbose_name='주요업무 비공개')
    dpt_name                = models.TextField(max_length=50, blank=True, null=True, verbose_name='부서명')
    dpt_name_yn             = models.BooleanField(default=False, verbose_name='부서명 비공개')
    salary                  = models.TextField(blank=True, null=True, verbose_name='급여')
    salary_yn               = models.BooleanField(default=False, verbose_name='급여 비공개')
    condition               = models.TextField(max_length=500, blank=True, null=True, verbose_name='자격조건')
    condition_yn            = models.BooleanField(default=False, verbose_name='자격조건 비공개')
    special_condition       = models.TextField(max_length=500, blank=True, null=True, verbose_name='우대조건')
    special_condition_yn    = models.BooleanField(default=False, verbose_name='우대조건 비공개')
    welfare                 = models.TextField(max_length=500, blank=True, null=True, verbose_name='혜택 및 복지')
    welfare_yn              = models.BooleanField(default=False, verbose_name='혜택 및 복지 비공개')
    location                = models.TextField(max_length=500, blank=True, null=True, verbose_name='회사위치')
    location_yn             = models.BooleanField(default=False, verbose_name='회사위치 비공개')
    jobadvertise_addr_code  = models.CharField(max_length=5, blank=True, null=True, verbose_name='실근무지(도로명코드)')
    jobadvertise_addr       = models.CharField(max_length=50, blank=True, null=True, verbose_name='실근무지(도로명주소)')
    jobadvertise_addr_detail = models.CharField(max_length=500, blank=True, null=True, verbose_name='실근무지(도로명상세)')
    jobadvertise_status     = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True, related_name='jobadvertise_status',
                                                limit_choices_to={'comidx': 'CA', 'code_topcd': None},
                                                verbose_name='공개상태코드', default='CA0200000')
    jobadvertise_end_dt     = models.DateField(null=True, blank=True, verbose_name='공고마감일')
    job_reward_type         = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='보상금종류', related_name='job_reward_type',
                                                limit_choices_to={'comidx': 'GA', 'code_topcd': None})
    job_reward_way          = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                                verbose_name='보상지급방식', related_name='job_reward_way',
                                                limit_choices_to={'comidx': 'GB', 'code_topcd': None})
    job_reward_amt1         = models.IntegerField(default=0, verbose_name='구직자 보상금액')
    job_reward_amt2         = models.IntegerField(default=0, verbose_name='추천인 보상금액')
    job_image               = models.ImageField(upload_to=settings.UPLOAD_ROOT + '/jobad/', null=True, blank=True,
                                                verbose_name='채용공고 이미지')
    job_background_image    = models.ImageField(upload_to=settings.UPLOAD_ROOT + '/jobad/', null=True, blank=True,
                                                verbose_name='채용공고 이미지(BG)')
    request_ticket          = models.IntegerField(default=1, verbose_name='필요티켓(장)')
    jobtag_json             = JSONField(null=True, blank=True, verbose_name='채용공고 Tag')
    job_manager             = models.ForeignKey(User, on_delete=models.DO_NOTHING,
                                                # db_constraint=False,
                                                limit_choices_to={'is_admin': True},
                                                blank=True, null=True, verbose_name='담당매니저')

    def __str__(self):
        return str(self.jobadvertise_title)

    @property
    def applicants_count(self):
        return self.jobapplicants.filter(~Q(applied_status='BW0702000')).count()

    def get_request_ticket(self):
        return self.request_ticket

    class Meta:
        verbose_name_plural = ('3. 채용공고 / JobAdvertise')



def jobapp_directory_path(instance, filename):
    # 공고별 이력서
    return 'uploads/jobapp/{}/{}'.format(instance.jobadvertise.id, filename)


# 채용공고 지원자
class JobApplicant(TimeStampedModel):
    jobadvertise        = models.ForeignKey(JobAdvertise, on_delete=models.CASCADE, blank=True, null=True,
                                            verbose_name='채용공고', related_name='jobapplicants')
    user                = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='지원자',
                                            related_name='applicants')
    resume              = models.ForeignKey(Resume, on_delete=models.CASCADE, blank=True, null=True, verbose_name='이력서')
    urlkey              = models.CharField(max_length=100, null=True, blank=True, verbose_name='유입URL')
    url_recuser         = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,
                                            null=True, related_name='url_recuser', verbose_name='URL추천인')
    applied_at          = models.DateTimeField(auto_now=False, default=datetime.datetime.now, verbose_name='지원시간')
    applied_status      = models.ForeignKey(ComCode, on_delete=models.CASCADE, blank=True, null=True,
                                            limit_choices_to={'comidx':'BW'},
                                            default='BW0100000', verbose_name='지원자 상태')
    applied_comment     = models.TextField(max_length=300, null=True, blank=True, verbose_name='지원자 코멘트')
    resume_pdf          = models.FileField(upload_to=jobapp_directory_path, null=True, blank=True, verbose_name='이력서PDF')
    resume_filename     = models.CharField(max_length=100, null=True, blank=True, verbose_name='파일명')
    # companyprofile      = models.ForeignKey(CompanyProfile, on_delete=models.SET_NULL, blank=True, null=True,
    #                                         verbose_name='지원경로', default=1, related_name='cp_jobapplicants') # 기본값 겟스로우
    hrprofile           = models.ForeignKey(HrProfile, on_delete=models.SET_NULL, blank=True, null=True,
                                            verbose_name='HR회사', default=None, related_name='hrprofile_jobapp')
    hrmanager           = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True,
                                            verbose_name='담당자', default=None, related_name='hrmanager')
    # 회원
    applied_username    = models.CharField(max_length=100, null=True, blank=True, verbose_name='회원 이름')
    applied_phone       = models.CharField(max_length=13, null=True, blank=True, verbose_name='회원 연락처')
    applied_birth       = models.CharField(max_length=10, null=True, blank=True, verbose_name='회원 생년월일')

    # 비회원 ( HR회사에서 이력서만 업로드할 경우 사용 )
    # non_username        = models.CharField(max_length=100, null=True, blank=True, verbose_name='비회원 이름')
    # non_phone           = models.CharField(max_length=11, null=True, blank=True, verbose_name='비회원 연락처')
    # non_birth           = models.CharField(max_length=8, null=True, blank=True, verbose_name='비회원 생년월일')
    job_answers_json    = JSONField(null=True, blank=True, verbose_name='구직자 답변')

    class Meta:
        verbose_name_plural = ('4. 채용지원자 / JobApplicant')
        unique_together = (('jobadvertise', 'user'),)


# 채용공고 질문(인사담당자)
class JobQuestion(models.Model):
    # job_question_gubun = models.ForeignKey(ComCode, on_delete=models.CASCADE, verbose_name='질문구분',
    #                                        limit_choices_to={'comidx': 'CD'}, related_name='job_question_gubun', null=True)
    jobadvertise            = models.ForeignKey(JobAdvertise, on_delete=models.CASCADE, verbose_name='채용공고', null=True, blank=True)
    job_question_comment    = models.CharField(max_length=100, blank=True, null=True, verbose_name='질문', default='')

    class Meta:
        verbose_name_plural = ('공고별질문 / JobQuestion')

    def __str__(self):
        return str(self.job_question_comment)


# 채용공고 답변목록(인사담당자)
class JobAnswer(models.Model):
    jobquestion = models.ForeignKey(JobQuestion, on_delete=models.CASCADE, verbose_name='질문', null=False,
                                    limit_choices_to=~Q(job_question_comment=None), related_name='jobanswers')
    job_answer_type = models.ForeignKey(ComCode, on_delete=models.CASCADE, related_name='job_answer_type', verbose_name='답변유형',
                                        limit_choices_to={'comidx': 'CE', 'code_topcd': None}, null=True)
    job_answer_comment = models.CharField(max_length=1000, verbose_name='답변목록', null=True, blank=True, default='')
    # job_answer_json = JSONField(null=True)

    class Meta:
        verbose_name_plural = ('공고별답변 / JobAnswer')

    def __str__(self):
        return str(self.job_answer_comment)


# 리뷰
class SugubReview(TimeStampedModel):
    sugub = models.ForeignKey(Sugub, on_delete=models.CASCADE, blank=True, null=True, verbose_name='수급',
                              related_name='sugub_reviews')
    user            = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='유저')

    hrprofile       = models.ForeignKey(HrProfile, on_delete=models.SET_NULL, blank=True, null=True,
                                        verbose_name='HR회사', related_name='hr_sugub_reviews')
    # companyprofile 삭제 예정
    companyprofile  = models.ForeignKey(CompanyProfile, on_delete=models.SET_NULL, blank=True, null=True,
                                        verbose_name='사용사업주')
    review_comment  = models.TextField(max_length=1500, null=True, blank=True, verbose_name='리뷰')
    # review_point    = models.IntegerField(blank=True, null=True, verbose_name='평균 별점')

    class Meta:
        verbose_name_plural = ('2_3. 리뷰 / SugubReview')
        unique_together = (('sugub', 'user'), )

    @property
    def point_avg(self): # 평균평점
        print('point_avg self:', self)

        return self.sugubreview_point.aggregate(Avg('point'))['point__avg']



# 티켓 ( HR 회사 )
# class CompanyTicket(TimeStampedModel):
#     companyprofile  = models.OneToOneField(CompanyProfile, on_delete=models.CASCADE, blank=True, null=True,
#                                            verbose_name='companyprofile', related_name='companyticket')
#     # ticket_type        = models.ForeignKey(ComCode, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='포인트 종류',
#     #                                     limit_choices_to={'comidx':'GA', 'code_topcd': None},)
#     ticket_content     = models.CharField(max_length=50, null=True, blank=True, verbose_name='티켓 내용')
#     ticket_count       = models.IntegerField(default=0, verbose_name='티켓')
#     ticket_remain      = models.IntegerField(default=0, verbose_name='남은 티켓')


# 결제내역
class ImportPaymentHistory(TimeStampedModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, verbose_name='user',
                             related_name='paymenthistory')
    pg = models.CharField(max_length=50, blank=True, null=True, verbose_name='결제사')
    imp_uid = models.CharField(max_length=100, blank=True, null=True, verbose_name='고유ID')
    merchant_uid = models.CharField(max_length=100, blank=True, null=True, verbose_name='상점거래ID')
    paid_amount = models.IntegerField(default=0, verbose_name='결제금액')
    cancel_request_amount = models.IntegerField(default=0, verbose_name='환불금액')
    reason = models.CharField(max_length=500, blank=True, null=True, verbose_name='환불사유')
    apply_num = models.CharField(max_length=100, blank=True, null=True, verbose_name='카드승인번호')

    class Meta:
        verbose_name_plural = ('결제내역 / ImportPaymentHistory')


# 면접 일정
class Interview(TimeStampedModel):
    jobapp = models.ForeignKey(JobApplicant, on_delete=models.CASCADE, blank=False, null=False, verbose_name='지원자',
                               related_name='interview_jobapp')
    interview_dt = models.DateTimeField(verbose_name='면접일정')
    comments = models.TextField(verbose_name='코멘트')
    addr_code = models.CharField(max_length=5, verbose_name='면접장소(도로명코드)')
    addr = models.CharField(max_length=100, verbose_name='면접장소')
    addr_detail = models.CharField(max_length=100, verbose_name='면접장소(상세)')
    # insert_user = models.
    # interview_manager = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='인터뷰담당자')
    interview_manager = models.CharField(max_length=50, blank=True, null=True, verbose_name='인터뷰 담당자명')
    interview_phone = models.CharField(max_length=50, blank=True, null=True, verbose_name='인터뷰 담당자 연락처')
    interview_email = models.CharField(max_length=50, blank=True, null=True, verbose_name='인터뷰 담당자 이메일')

    class Meta:
        verbose_name_plural = ('5. 면접일정 / Interview')


# 예상견적서
class Estimate(TimeStampedModel):
    sugub = models.ForeignKey(Sugub, on_delete=models.CASCADE, blank=False, null=False, verbose_name='수급',
                              related_name='estimate_sugub')
    hrprofile = models.ForeignKey(HrProfile, on_delete=models.SET_NULL, blank=True, null=True,
                                  related_name='estimate_hrprofile')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='작성자',
                             related_name='estimate_user')
    comments = models.TextField(max_length=10000, blank=True, null=True, verbose_name='코멘트')

    class Meta:
        verbose_name_plural = ('2_2. 예상견적서 / Estimate')


def estimate_directory_path(instance, filename):
    return 'uploads/hr/{}/estimate/{}'.format(str(instance.estimate.hrprofile.id) + '.' + instance.estimate.hrprofile.custname,
                                                 filename)


# 예상견적서 첨부파일
class EstimateFile(TimeStampedModel):
    estimate = models.ForeignKey(Estimate, on_delete=models.CASCADE, blank=False, null=False, related_name='estimate_file')
    estimate_file = models.FileField(upload_to=estimate_directory_path, null=True, blank=True,
                                     verbose_name='예상견적서 관련파일')

    @property
    def estimate_filename(self):
        return os.path.basename(self.estimate_file.name)