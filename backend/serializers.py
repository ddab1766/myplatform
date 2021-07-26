from datetime import date
from allauth.socialaccount.models import SocialAccount
from allauth.utils import email_address_exists
from django.contrib.auth.forms import PasswordResetForm
from invitations.utils import get_invitation_model
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import UserDetailsSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.account.admin import EmailAddress
from django.conf import settings
from django.utils.translation import gettext as _
from allauth.account import app_settings as allauth_settings
# from rest_invitations.serializers import InvitationReadSerializer

from .models import User, ComIdx, ComCode, User, Jikjong, CompanyBaseInfo, Question, Answer, Notification, Qna, FAQ, \
    Point, Alarm, AlarmSetting
from user_profile.models import UserProfile, UserSpecial, Resume
from company_profile.models import CompanyProfileCoWorker
from hr_profile.models import HrProfileCoWorker


class ComIdxSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComIdx
        fields = '__all__'


class ComCodeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComCode
        fields = ( 'code_id', 'code_name', 'code_topidx', 'code_topcd')
        # read_only_fields = fields


class ComCodeSerializer(serializers.Serializer):
    code_id = serializers.CharField()
    code_name = serializers.CharField()
    code_topidx = serializers.CharField(allow_null=True)
    code_topcd = serializers.CharField(allow_null=True)


class RegisterSerializer(RegisterSerializer):
    recuser = serializers.CharField(default='1')
    nickname = serializers.CharField()
    phone = serializers.CharField(required=False)
    key = serializers.CharField(max_length=64, required=False)

    def save(self, request):
        print('RegisterSerializer serializer:', request)
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)

        nickname = self.validated_data.get('nickname')
        phone = self.validated_data.get('phone')
        key = self.validated_data.get('key', None)

        # 초대한 사람의 회사프로필 기본권한으로 편입
        if key is not None:
            obj = get_invitation_model().objects.get(key=key)
            obj.accepted = True
            # obj.delete() 딜리트가안먹음
            inviter = User.objects.get(email=obj.inviter)
            companyprofile, hrprofile = inviter.check_profile(inviter)
            if companyprofile is not None:
                companyprofile.user.add(user)
                company_instance = CompanyProfileCoWorker.objects.create(
                    user=user, companyprofile=companyprofile,
                    companyprofile_auth=ComCode.objects.get(code_id='CG0100000')
                )
                company_instance.save()
            if hrprofile is not None:
                hrprofile.user.add(user)
                hr_instance = HrProfileCoWorker.objects.create(
                    user=user, hrprofile=hrprofile,
                    hrprofile_auth=ComCode.objects.get(code_id='CG0100000')
                )
                hr_instance.save()

        user.nickname = nickname
        user.phone = phone
        user.save()

        setup_user_email(request, user, [])

        recuser = self.validated_data.get('recuser', '1')

        UserProfile.objects.create(
            user=user,
            recuser=User.objects.get(id=recuser)
        )
        alarm_code = ComCode.objects.filter(code_topidx='ZH', code_use=True)
        for code in alarm_code:
            obj = AlarmSetting.objects.create(
                user=user,
                alarm_code=code
            )
            obj.save()

        return user


class JikjongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jikjong
        fields = '__all__'


class UserSimpleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    nickname = serializers.CharField()
    phone = serializers.CharField()
    profile_image = serializers.ImageField()
    # username = serializers.CharField(source="userprofile.username", allow_blank=True, required=False, allow_null=True)


class AlarmSettingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmSetting
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.allow_sms = validated_data.get('allow_sms', instance.allow_sms)
        instance.allow_email = validated_data.get('allow_email', instance.allow_email)
        instance.allow_kakao = validated_data.get('allow_kakao', instance.allow_kakao)
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super(AlarmSettingModelSerializer, self).to_representation(instance)
        if data['alarm_code']:
            data['alarm_code'] = ComCodeSerializer(instance.alarm_code).data
        return data


class UserSerializer(UserDetailsSerializer):
    from company_profile.serializers import ImportPaymentHistorySerializer, CompanyProfileSerializer
    from user_profile.serializers import InterestSugubSerializer

    class Meta:
        model = User
        # fields = '__all__'
        fields = (
            'id', 'email', 'is_admin', 'is_temp', 'nickname', 'phone', 'profile_image',
            #'password', 'last_login', 'is_active',
            # 'date_of_birth', 'education_level', 'address', 'status', 'career_gb',
            # 'career_gigan', 'salary', 'hope_site', 'website', 'about', 'gender', 'balance', 'recuser',
            # 'userspecial',
            'companyprofile',
            'hrprofile',
            # 'applicants',
            'chatroom', 'alarm_count', 'interestsugub_user', 'alarm_settings'
        )
    nickname        = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    phone           = serializers.CharField(allow_blank=True, required=False, allow_null=True)
    profile_image   = serializers.ImageField(required=False, allow_null=True)

    # user_profile
    # date_of_birth   = serializers.CharField(source="userprofile.date_of_birth", allow_blank=True, required=False, allow_null=True)
    # education_level = serializers.PrimaryKeyRelatedField(source="userprofile.education_level", allow_null=True,
    #                                                      queryset=ComCode.objects.all())
    # address         = serializers.PrimaryKeyRelatedField(source="userprofile.address", allow_null=True,
    #                                                      queryset=ComCode.objects.all())
    # status          = serializers.PrimaryKeyRelatedField(source="userprofile.status", allow_null=True,
    #                                                      queryset=ComCode.objects.all())
    # career_gb       = serializers.CharField(source="userprofile.career_gb", allow_blank=True, required=False, allow_null=True)
    # career_gigan    = serializers.CharField(source="userprofile.career_gigan", allow_blank=True, required=False, allow_null=True)
    # salary          = serializers.CharField(source="userprofile.salary", allow_blank=True, required=False, allow_null=True)
    # hope_site       = serializers.CharField(source="userprofile.hope_site", allow_blank=True, required=False, allow_null=True)
    # website         = serializers.URLField(source="userprofile.website", allow_blank=True, required=False, allow_null=True)
    # about           = serializers.CharField(source="userprofile.about", allow_blank=True, required=False, allow_null=True)
    # gender          = serializers.CharField(source="userprofile.gender", allow_blank=True, required=False, allow_null=True)
    # balance         = serializers.IntegerField(source="userprofile.balance", required=False)
    # recuser         = serializers.CharField(source='userprofile.recuser', allow_blank=True, required=False,  allow_null=True)
    # company_profile
    companyprofile  = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    # hr_profile
    hrprofile  = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    chatroom = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    interestsugub_user = InterestSugubSerializer(read_only=True, many=True)
    alarm_settings = AlarmSettingModelSerializer(read_only=True, many=True)

    # 미사용
    # userpoint       = UserPointSerializer(many=True, read_only=True)    # UserPoint (사용자환급내역)
    # paymenthistory  = ImportPaymentHistorySerializer(many=True, read_only=True) # ImportPaymentHistory (결재내역)

    def update(self, instance, validated_data):
        print('validate_dated', validated_data)
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.phone = validated_data.get('phone', instance.phone)
        profile_image = validated_data.pop('profile_image', None)

        if profile_image is not None:
            instance.profile_image = profile_image
            instance.save()
            return instance

        # if 'userprofile' in validated_data:
        #     profile_data        = validated_data.pop('userprofile', {})
        #     username            = profile_data.get('username')
        #     phone               = profile_data.get('phone')
        #     date_of_birth       = profile_data.get('date_of_birth')
        #     website             = profile_data.get('website')
        #     about               = profile_data.get('about')
        #     gender              = profile_data.get('gender')
        #     education_level     = profile_data.get('education_level')
        #     address             = profile_data.get('address')
        #     status              = profile_data.get('status')
        #
        #     try:
        #         print(instance.userprofile)
        #     except:
        #         UserProfile.objects.create(
        #             user=instance
        #         )
        #
        #     # get and update user profile
        #     profile = instance.userprofile
        #     if profile_data:
        #         if username:
        #             profile.username = username
        #         if website:
        #             profile.website = website
        #         if about:
        #             profile.about = about
        #         if phone:
        #             profile.phone = phone
        #         if date_of_birth:
        #             profile.date_of_birth = date_of_birth
        #         if gender:
        #             profile.gender = gender
        #         if education_level:
        #             profile.education_level = education_level
        #         if address:
        #             profile.address = address
        #         if status:
        #             profile.status = status
        #
        #         profile.save()
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super(UserSerializer, self).to_representation(instance)
        data['emailaddress'] = EmailAddress.objects.filter(user=instance).values('verified')[0]['verified']
        # if data['address']:
        #     data['address'] = ComCode.objects.filter(code_id=data['address']).values()[0]
        # if data['education_level']:
        #     data['education_level'] = ComCode.objects.filter(code_id=data['education_level']).values()[0]
        return data


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def to_representation(self, instance):
        data = super(QuestionSerializer, self).to_representation(instance)
        # if data['jikjong_mid']:
        #     data['question_id'] = ComCode.objects.filter(code_id=data['jikjong_mid']).values()
        data['answers'] = Answer.objects.filter(question=instance).values()
        return data


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class SocialAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialAccount
        fields = '__all__'


class CompanyBaseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBaseInfo
        fields = '__all__'


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm

    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('이메일이 존재하지 않습니다.'))
        return value

    def save(self):
        request = self.context.get('request')
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'html_email_template_name': 'registration/password_reset_message.html',
            'request': request,
        }
        self.reset_form.save(**opts)


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    noti_category_nm = serializers.CharField(source='noti_category', required=False)
    noti_level_nm = serializers.CharField(source='noti_level', required=False)


class QnaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qna
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


class UserSerializerApi(UserDetailsSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PointModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = '__all__'

class AlarmSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    receiver = serializers.PrimaryKeyRelatedField(read_only=True)
    alarm_gubun = serializers.PrimaryKeyRelatedField(read_only=True)
    title = serializers.CharField()
    contents = serializers.CharField()
    is_read = serializers.BooleanField()
    link_url = serializers.URLField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')


class AlarmModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = ['id', 'receiver', 'alarm_gubun', 'title', 'contents', 'is_read', 'link_url', 'created_time',]


class InvitationsModelSerializer(serializers.ModelSerializer):
    class Meta:
        from invitations.utils import get_invitation_model
        model = get_invitation_model()
        fields = '__all__'
        read_only_fields = ('key', 'sent', 'inviter')

    created = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', required=False)


