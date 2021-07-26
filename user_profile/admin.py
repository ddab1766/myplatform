from django.contrib import admin
import re
from backend.models import ComCode
from .models import UserComment, UserProfile, Resume, UserSpecial, Career, Education, UserAdvKey, CompanyAdvKey, \
    UserPoint, Language, InterestSugub


# Register your models here.
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'user', 'username', 'phone', 'date_of_birth', 'gender', 'recuser', 'balance']


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'userspecial', 'resume_title', 'entry_date', 'modify_date', 'open_yn',
                     'urlkey' ]


@admin.register(UserSpecial)
class UserSpecialAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'user', 'jikjong_top', 'jikjong_mid', 'career_gigan', 'salary_amt',
                     'urlkey', 'open_yn', 'created_time', 'modified_time']
    # search_fields = ['jikjong_mid__code_name']
    filter_horizontal = ('jikjong_low',)

    # def formfield_for_manytomany(self, db_field, request, **kwargs):
    #     p = re.compile('[A-Z][A-Z][0-9][0-9]')
    #     if db_field.name == 'jikjong_mid':
    #         kwargs['queryset'] = ComCode.objects.filter(code_topcd__iregex=p+"00000")
    #         return super(UserSpecialAdmin, self).formfield_for_manytomany(db_field, request, **kwargs)

@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'resume', 'career_start', 'career_end', 'career_company', 'career_dpt_name',
                     'career_work_role']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'resume', 'education_start', 'education_end', 'school_code', 'major_detail']


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'resume', 'language', 'language_level']


@admin.register(UserAdvKey)
class UserAdvKeyAdmin(admin.ModelAdmin):
    list_display = ['id', 'jobadvertise', 'user', 'hash', 'url', 'orgUrl']


@admin.register(CompanyAdvKey)
class CompanyAdvKeyAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'hash', 'url', 'orgUrl']


@admin.register(UserPoint)
class UserPointAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'poi_type', 'poi_content', 'poi_point']

@admin.register(UserComment)
class UserCommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'jobadvertise', 'review_comment', 'review_point','write_id']


@admin.register(InterestSugub)
class InterestSugubAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'sugub', ]


