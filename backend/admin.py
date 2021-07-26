from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from flexselect import FlexSelectWidget

from .forms import UserChangeForm, UserCreationForm
from .models import (
    User, ComIdx, ComCode, Jikjong, CompanyBaseInfo, JikjongLow, Question, Answer, ComPaCode, \
    Notification, Qna, FAQ, Point, Alarm,
    AlarmSetting)


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('id', 'email', 'nickname', 'phone', 'is_admin', 'userprofile', 'is_active', 'is_temp', 'is_agree',
                    'is_privacy', 'profile_image' )
    list_filter = ('is_admin', 'is_temp')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'profile_image', 'nickname', 'phone')}),
        # ('Personal info', {'fields': ('date_of_birth',)}),
        ('Permissions', {'fields': ('is_admin', 'is_active', 'is_temp')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )
    search_fields = ('email',)
    ordering = ('-is_admin', 'id', 'email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.site.unregister(Group)


@admin.register(ComIdx)
class ComIdxAdmin(admin.ModelAdmin):
    list_display = [ 'idx_id', 'idx_name', 'idx_use']
    list_filter = [ 'idx_name', 'idx_use']


@admin.register(ComCode)
class ComCodeAdmin(admin.ModelAdmin):
    list_display = [ 'comidx', 'code_id', 'code_name', 'code_topidx', 'code_topcd', 'code_use']
    list_filter = [ 'comidx' ]
    search_fields = ['code_id', 'code_name', 'code_topcd']


@admin.register(Jikjong)
class JikjongAdmin(admin.ModelAdmin):
    list_display = ['jikjong_mid_id', 'jikjong_mid', 'jikjong_comment']
    list_filter = ['jikjong_mid', ]
    search_fields = ['jikjong_mid__code_name']
    # filter_horizontal = ('jikjong_low',)


@admin.register(JikjongLow)
class JikjongLowAdmin(admin.ModelAdmin):
    list_display = ['jikjong_low_id', 'jikjong_low', 'compacode']
    list_filter = ['jikjong_low', ]
    search_fields = ['jikjong_low__code_name']


@admin.register(Question)
class QuestionsAdmin(admin.ModelAdmin):
    list_display = [ 'id', 'jikjong_mid', 'jikjong_low', 'question_gubun', 'question_comment', 'question_use_yn']
    list_filter = ['jikjong_mid']
    search_fields = ['jikjong_mid__code_name', 'jikjong_low__code_name']
    fieldsets = (
        (None, {
            'fields': ('jikjong_mid', 'jikjong_low', 'question_gubun', 'question_use_yn')
        }),
        ('질문', {
            'fields': ('question_comment', )
        })
    )
    # radio_fields = {"jikjong_low": admin.VERTICAL}
    ordering = ('jikjong_mid_id', 'jikjong_low_id')
    autocomplete_fields = ['jikjong_low']

    # def formfield_for_foreignkey(self, db_field, request, **kwargs):
    #     if db_field.name == "jikjong_low":
    #         print(db_field.name)
    #         kwargs["queryset"] = ComCode.objects.filter(code_topcd=request.user)
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'question', 'answer_type', 'answer_comment', 'answer_placeholder', 'answer_use_yn']
    list_filter = ['question']
    search_fields = ['answer_comment']

    fieldsets = (
        (None, {
            'fields': ('question', 'answer_type')
        }),
        ('답변(주관식단답형/주관식서술형은 공백으로)', {
            'fields': ('answer_comment', 'answer_placeholder')
        })
    )


@admin.register(CompanyBaseInfo)
class CompanyBaseInfoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CompanyBaseInfo._meta.get_fields()]
    list_display_links = [field.name for field in CompanyBaseInfo._meta.get_fields()]
    search_fields = ('custid', 'com_name',)

@admin.register(ComPaCode)
class ComPaCodeAdmin(admin.ModelAdmin):
    list_display = ['id', 'zikcode1', 'zikname1', 'zikcode2', 'zikname2', 'zikcode3', 'zikname3']
    # list_display = [field.name for field in ComPaCode._meta.get_fields()]


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'noti_category', 'noti_level', 'noti_event']


@admin.register(Qna)
class QnaAdmin(admin.ModelAdmin):
    list_display = ['id', 'qna_email', 'qna_title', 'qna_text', 'qna_phone']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['id', 'faq_gubun', 'faq_title', 'faq_text']


@admin.register(Point)
class PointAdmin(admin.ModelAdmin):
    list_display = ['id', 'sugub_review', 'point_gubun', 'point']


@admin.register(Alarm)
class AlarmAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_time', 'receiver', 'alarm_gubun', 'title', 'contents', 'is_read', 'link_url']


@admin.register(AlarmSetting)
class AlarmAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'alarm_code', 'allow_email', 'allow_fcm', 'allow_kakao', 'allow_sms']

