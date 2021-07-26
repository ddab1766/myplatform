from rest_framework import serializers
from myplatform.settings import URL_FRONT

from sendmail.sendmail import SendMail

from sms.models import InfoSms
from .models import HrProfile, HrProfileCoWorker, HrSpecial, HrImage, HrFile, HrAccountInfo, HrFee
from backend.models import (
    ComIdx, ComCode, User, Alarm
)
from backend.serializers import ComCodeSerializer, UserSimpleSerializer
from company_profile.serializers import SugubReviewSerializer, SugubSerializer

class HrAccountInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrAccountInfo
        fields = ['id', 'hrprofile', 'account_name', 'account_phone', 'account_email']
        read_only_fields = ['hrprofile']


class HrProfileCoworkerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.CharField()
    hrprofile_auth = serializers.CharField()
    # hrprofile_auth = serializers.Serializer('backend.ComCodeSerializer')
    hrprofile_auth = ComCodeSerializer()
    coworker_phone = serializers.CharField()


class HrProfileCoWorkerModelSerializer(serializers.ModelSerializer):
    hrprofile_auth = ComCodeSerializer(read_only=True)
    # hrprofile_auth = serializers.Serializer('backend.ComCodeSerializer')
    hrprofile_auth_id = serializers.PrimaryKeyRelatedField(queryset=ComCode.objects.all())
    user = UserSimpleSerializer()
    # user = serializers.SerializerMethodField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

    class Meta:
        model = HrProfileCoWorker
        fields = ['id', 'hrprofile', 'user', 'hrprofile_auth', 'coworker_phone',
                  'created_time', 'hrprofile_auth_id']

    # def get_user(self, obj):
    #     from backend.serializers import UserSimpleSerializer
    #     return UserSimpleSerializer(obj.user).data

    def update(self, instance, validated_data):
        instance.hrprofile_auth = validated_data.get('hrprofile_auth_id')
        instance.save()

        return instance


class HrSpecialSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hr_jikjong_top = ComCodeSerializer()
    # hr_jikjong_top = serializers.Serializer('backend.ComCodeSerializer')
    hr_jikjong_mid = ComCodeSerializer()
    # hr_jikjong_mid = serializers.Serializer('backend.serializers.ComCod11eSerializer')
    hr_jikjong_low = ComCodeSerializer(many=True)
    # hr_jikjong_low = serializers.Serializer('backend.ComCodeSerializer')
    jikjong_tax_start = serializers.CharField()
    jikjong_tax_end = serializers.CharField()


class HrFileSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hr_file = serializers.FileField()
    hr_filename = serializers.CharField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')


class HrImageSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hr_image = serializers.FileField()
    hr_image_filename = serializers.CharField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')


class HrFeeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrFee
        fields = '__all__'
        read_only_fields = ['hrprofile', ]


# HR PROFILE
class HrProfileModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrProfile
        fields = '__all__'

    user = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # since = serializers.IntegerField(allow_null=True, required=False, initial=0)
    address = serializers.PrimaryKeyRelatedField(read_only=True)
    # cmp_manager = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True, required=False)
    # cmp_manager = serializers.PrimaryKeyRelatedField(read_only=True)
    company_logo = serializers.FileField(read_only=True)
    hr_coworker = HrProfileCoworkerSerializer(many=True, read_only=True)
    hrspecial = HrSpecialSerializer(many=True, read_only=True)
    hrprofile_file = HrFileSerializer(many=True, read_only=True)
    hraccountinfo = HrAccountInfoSerializer(many=True, read_only=True)
    hrprofile_image = HrImageSerializer(many=True, read_only=True)

    # service_address = ComCodeSerializer(many=True, read_only=True)
    # services = ComCodeSerializer(many=True, read_only=True)

    hrfee = HrFeeModelSerializer(many=True, allow_null=True, required=False)

    def create(self, validated_data):
        print('validated_data', validated_data)
        user = self.context['request'].user
        # phone = validated_data.pop('phone', {})
        address_data = validated_data.pop('service_address', {})
        service_data = validated_data.pop('services', {})
        hrfee_data = validated_data.pop('hrfee', {})

        hrprofile = HrProfile.objects.create(**validated_data)
        created = True

        if hrfee_data != {}:
            for data in hrfee_data:
                created = HrFee.objects.create(hrprofile=hrprofile, **data)

        if address_data:
            for address in address_data:
                hrprofile.service_address.add(address)
        if service_data:
            for service in service_data:
                hrprofile.services.add(service)

        hrprofile.user.add(user)

        if created:  # 신규등록이면 마스터 권한
            hr_instance = HrProfileCoWorker.objects.create(
                user=user, hrprofile=hrprofile,
                # coworker_phone=manager_phone,
                hrprofile_auth=ComCode.objects.get(code_id='CG0200000')
            )
            print('신규', hr_instance)
        else:  # 이미 존재하면 기본 권한
            hr_instance = HrProfileCoWorker.objects.create(
                user=user, hrprofile=hrprofile,
                # coworker_phone=manager_phone,
                hrprofile_auth=ComCode.objects.get(code_id='CG0100000'))
            print('기존', hr_instance)

        hr_instance.save()

        # user.phone = phone
        # user.save()

        '''
        HR 기업프로필 등록 시 메일 발송 ( 속도때문에 1명만 가도록 )
        '''
        admin_email_list = User.objects.filter(is_admin=True, email='admin@chaema.co.kr').values('email')
        for email in admin_email_list:
            email_template = 'common/hrcompany_register'
            email_address = email['email']
            ctx = {
                "user": validated_data.get('user', None)
            }
            SendMail(email_template, email_address, ctx)

        '''
        관리자들에게 알람
        '''
        admin_list = User.objects.filter(is_admin=True).values('id')
        for receiver in admin_list:
            alarm = Alarm(receiver=User(id=receiver['id']),
                          alarm_gubun=ComCode(code_id='ZE0300000'),
                          title='신규 HR 기업이 등록되었습니다.',
                          contents='새로운 HR 기업을 검토해주세요.\n\r')
            alarm.save()

        '''
        신규 기업 문자 알람 
        '''
        for receiver in admin_list:
            obj = User.objects.get(id=receiver['id'])
            if obj.phone:
                infosms = InfoSms.objects.create(
                    from_number=obj.phone,
                    to_number=obj.phone,
                    contents='신규 HR 기업이 등록되었습니다.'
                )
                infosms.save()

        return hrprofile

    def update(self, instance, validated_data):
        hrfee_data = validated_data.pop('hrfee', {})
        address_data = validated_data.pop('service_address', {})
        service_data = validated_data.pop('services', {})

        instance.service_address.set(address_data)
        instance.services.set(service_data)

        print('hrfee_data:', hrfee_data)
        if hrfee_data != {}:
            HrFee.objects.filter(hrprofile=instance).delete() #삭제 후 다시 등록..
            for data in hrfee_data:
                created = HrFee.objects.update_or_create(hrprofile=instance, **data)

        # 알림
        next_status = validated_data.get('status_cd', None)
        if instance.status_cd != next_status:
            # 검토 -> 승인
            if next_status == ComCode.objects.get(code_id='CB0200000'):
                ''' 파견사업주 알림 '''
                for receiver in instance.user.all():
                    hr_alarm = Alarm(
                        receiver=receiver,
                        alarm_gubun=ComCode(code_id='ZE0300000'),
                        title='파견사업주 파트너로 승인되었습니다.',
                        contents='파견사업주 전용 관리페이지를 활용해주세요.',
                        link_url=URL_FRONT + 'Mng/dashboard/'
                    )
                    hr_alarm.save()

        file_data = self.context['request'].FILES

        if file_data:
            company_logo = file_data.get('company_logo')
            hrprofile_file = file_data.get('hrprofile_file')
            hrprofile_image = file_data.get('hrprofile_image')

            if company_logo:
                instance.company_logo = company_logo
            if hrprofile_image:
                HrImage.objects.create(hrprofile=instance, hr_image=hrprofile_image)
                # HrImage.objects.get_or_create(hrprofile=instance, hr_image=hrprofile_image)
            if hrprofile_file:
                HrFile.objects.create(hrprofile=instance, hr_file=hrprofile_file)
            instance.save()

        instance = super(HrProfileModelSerializer, self).update(instance, validated_data)
        return instance

    def to_representation(self, instance):
        # data = super(HrProfileModelSerializer, self).to_representation(instance)
        data = HrProfileSerializer(instance).data
        # todo 주석 해제시 에러
        # if data['cmp_manager']:
        #     data['cmp_manager'] = UserSimpleSerializer(instance.cmp_manager).data
        # if data['status_cd']:
        #     data['status_cd'] = ComCodeSerializer(instance.status_cd).data
        # if data['services']:
        #     temp_array = []
        #     for service in data['services']:
        #         temp_array.append(ComCode.objects.filter(code_id=service).values()[0])
        #     data['services'] = temp_array
        # if data['service_address']:
        #     temp_array = []
        #     for address in data['service_address']:
        #         temp_array.append(ComCode.objects.filter(code_id=address).values()[0])
        #     data['service_address'] = temp_array

        return data

# class PartnersSerializer(serializers.Serializer):
#     id = serializers.IntegerField()
#     custname = serializers.CharField(required=False)
#     emp_count = serializers.CharField(allow_null=True, allow_blank=True)
#     gross_total = serializers.CharField(required=False)
#     company_logo = serializers.FileField()
#     load_addr = serializers.CharField(required=False)
#     load_addr_detail = serializers.CharField(required=False)
#     # service_address = ComCodeSerializer(many=True)
#     is_partners = serializers.BooleanField()

class HrProfileSimpleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    cust_gubun = ComCodeSerializer()
    custname = serializers.CharField()
    custid = serializers.CharField(required=False)
    homepage = serializers.CharField(required=False)
    telno = serializers.CharField(required=False)
    faxno = serializers.CharField(required=False)
    emp_count = serializers.CharField(allow_null=True, allow_blank=True)
    gross_total = serializers.CharField(required=False)
    manager_email = serializers.CharField(required=False)
    manager_phone = serializers.CharField(required=False)
    introduce = serializers.CharField(required=False)
    hraccountinfo = HrAccountInfoSerializer(many=True, read_only=True)
    # cmp_manager = serializers.CharField()
    cmp_manager = UserSimpleSerializer()
    company_logo = serializers.FileField()
    load_addr_code = serializers.CharField(required=False)
    load_addr = serializers.CharField(required=False)
    load_addr_detail = serializers.CharField(required=False)
    hr_bokri = serializers.CharField(required=False)
    service_address = ComCodeSerializer(many=True)
    services = ComCodeSerializer(many=True)
    is_expose = serializers.BooleanField()
    is_partners = serializers.BooleanField()
    # address = serializers.Serializer('backend.ComCodeSerializer')
    status_cd = ComCodeSerializer()
    status_reason = serializers.CharField(required=False)
    # status_cd= serializers.Serializer('backend.ComCodeSerializer')

class PartnersSerializer(HrProfileSimpleSerializer):
    hrprofile_image = HrImageSerializer(many=True)
    hrprofile_file = HrFileSerializer(many=True)
    hrspecial = HrSpecialSerializer(many=True)
    hr_sugub_reviews = SugubReviewSerializer(many=True, read_only=True)
    resume_count = serializers.IntegerField(allow_null=True)
    jobad_count = serializers.IntegerField(allow_null=True)
    is_expose = serializers.BooleanField(read_only=True)
    is_partners = serializers.BooleanField(read_only=True)
    services = ComCodeSerializer(many=True)


class HrFeeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    fee_gubun = ComCodeSerializer()
    start = serializers.IntegerField()
    end = serializers.IntegerField()
    fee_start = serializers.FloatField()
    fee_end = serializers.FloatField()


class HrProfileSerializer(HrProfileSimpleSerializer):
    hrprofile_image = HrImageSerializer(many=True)
    hrprofile_file = HrFileSerializer(many=True)
    # hrspecial = HrSpecialSerializer(many=True)
    hr_coworker = HrProfileCoworkerSerializer(many=True)
    hr_sugub_reviews = SugubReviewSerializer(many=True, read_only=True)
    resume_count = serializers.IntegerField(allow_null=True)
    jobad_count = serializers.IntegerField(allow_null=True)
    is_expose = serializers.BooleanField(read_only=True)
    is_partners = serializers.BooleanField(read_only=True)
    hrfee = HrFeeSerializer(many=True, read_only=True)


class HrSpecialModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrSpecial
        fields = '__all__'
        unique_together = (('hrprofile', 'hr_jikjong_top', 'hr_jikjong_mid'),)
        read_only_fields = ('hrprofile', )

    # def validate(self, attrs):
    #     print('attrs:', attrs)
    #     raise serializers.ValidationError("최대 등록 갯수 초과")
