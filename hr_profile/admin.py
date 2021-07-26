from django.contrib import admin
from .models import HrProfile, HrProfileCoWorker, HrSpecial, HrImage, HrFile, HrAccountInfo, HrFee


@admin.register(HrProfile)
class HRProfileAdmin(admin.ModelAdmin):
    list_display = [ 'id',  'cust_gubun', 'custname', 'custid', 'status_cd', 'is_expose', 'is_partners']
    filter_horizontal = ('user',)
    list_filter = ('is_expose', )
    search_fields = ('custname', 'custid')


@admin.register(HrProfileCoWorker)
class HrProfileCoWorkerAdmin(admin.ModelAdmin):
    list_display = [ 'id',  'hrprofile', 'user', 'hrprofile_auth', 'coworker_phone']
    # filter_horizontal = ('user',)


@admin.register(HrSpecial)
class HrSpecialAdmin(admin.ModelAdmin):
    list_display = ['id', 'hrprofile', 'hr_jikjong_top', 'hr_jikjong_mid', 'jikjong_tax_start', 'jikjong_tax_end']
    filter_horizontal = ('hr_jikjong_low',)


@admin.register(HrImage)
class HrImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'hrprofile', 'hr_image']


@admin.register(HrFile)
class HrFileAdmin(admin.ModelAdmin):
    list_display = ['id', 'hrprofile', 'hr_file']


@admin.register(HrAccountInfo)
class HrAccountInfoAdmin(admin.ModelAdmin):
    list_display = ['id', 'hrprofile', 'account_name', 'account_phone', 'account_email']

@admin.register(HrFee)
class HrFeeAdmin(admin.ModelAdmin):
    list_display = ['id', 'hrprofile', 'fee_gubun', 'start', 'end', 'fee_start', 'fee_end']