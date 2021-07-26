from django.contrib import admin
from sms.models import AuthSms, InfoSms


@admin.register(AuthSms)
class AuthSmsAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'auth_number', 'created_time', 'modified_time']


@admin.register(InfoSms)
class InfoSmsAdmin(admin.ModelAdmin):
    list_display = ['from_number', 'to_number', 'contents', 'created_time', 'modified_time']
