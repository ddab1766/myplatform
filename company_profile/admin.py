from django.contrib import admin

# from chaegongERP.admin import MultiDBModelAdmin
from .models import CompanyProfile, Sugub, JobAdvertise, JobApplicant, SugubReview, CompanyProfileCoWorker, JobQuestion, \
    JobAnswer, ImportPaymentHistory, Interview, Estimate, EstimateFile, SugubSign


# admin.site.register(CompanyProfile, MultiDBModelAdmin)
# Register your models here.
@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    # list_display = [ 'id', 'user', 'custid', 'homepage', 'introduce']
    list_display = [ 'id',  'custname', 'custid', 'status_cd', 'ticket']
    filter_horizontal = ('user',)


@admin.register(CompanyProfileCoWorker)
class CompanyProfileCoWorkerAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'companyprofile', 'user', 'companyprofile_auth', 'created_time', 'modified_time']


@admin.register(Sugub)
class SugubAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'user', 'companyprofile', 'sugub_title', 'chae_cd', 'sugub_end_dt', 'work_position', 'sugub_career_gb', 'career_start', 'career_end',
                     # 'work_position', 'education_cd', 'sugub_gender', 'age_start', 'age_end', 'work_load_addr_code','work_role',
                     'sugub_jikjong_mid',
                     # 'work_load_addr', 'work_load_addr_detail', 'work_post_addr_code', 'work_post_addr', 'work_post_addr_detail','bokri'
                     'salary_gubun', 'salary_start', 'salary_end', 'manager', 'sugub_status', 'created_at' ]
    filter_horizontal = ('sugub_jikjong_low',)
    search_fields = ('companyprofile', 'work_position')


@admin.register(SugubSign)
class SugubSignAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'sugub', 'sign_code', 'sanctioner', 'damdang', 'created_time', 'modified_time' ]


@admin.register(JobAdvertise)
class JobAdvertiseAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'sugub', 'jobadvertise_title', 'jobadvertise_status', 'jobadvertise_end_dt', 'company_name',
                     'created_time', 'modified_time',
                     'company_name_yn', 'job_reward_amt1', 'job_reward_amt2', 'main_work', 'main_work_yn']


@admin.register(JobApplicant)
class JobApplicantAdmin(admin.ModelAdmin):
    list_display = [  'id', 'user', 'jobadvertise', 'resume', 'hrprofile', 'applied_status', 'applied_at',
                      # 'urlkey',
                    'applied_username', 'applied_phone', 'applied_birth',
                      'url_recuser', 'hrmanager'
                      # 'non_username', 'non_phone', 'non_birth'
                      ]


@admin.register(JobQuestion)
class JobQuestionAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'jobadvertise_id', 'jobadvertise', 'job_question_comment']


@admin.register(JobAnswer)
class JobAnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'jobquestion_id', 'jobquestion', 'job_answer_type', 'job_answer_comment']


@admin.register(SugubReview)
class SugubReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'sugub', 'review_comment', 'hrprofile']


@admin.register(ImportPaymentHistory)
class ImportPaymentHistoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'imp_uid', 'merchant_uid', 'paid_amount', 'apply_num', 'cancel_request_amount']


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'jobapp', 'interview_dt', 'comments', 'addr_code', 'addr', 'addr_detail']


@admin.register(Estimate)
class EstimateAdmin(admin.ModelAdmin):
    list_display = ['id', 'sugub', 'hrprofile', 'user', 'comments', 'created_time']
    # filter_horizontal = ('estimate_file',)

@admin.register(EstimateFile)
class EstimateFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'estimate', 'estimate_file' ]
