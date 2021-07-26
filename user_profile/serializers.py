import urllib
from rest_framework import serializers
import requests, json


from .models import UserProfile, UserSpecial, Resume, Career, Education, UserAdvKey, CompanyAdvKey, InterestAdv, \
    UserPoint, Language, UserComment, InterestSugub
from backend.models import ComCode, User
from backend.serializers import ComCodeSerializer
from company_profile.models import CompanyProfile, ImportPaymentHistory



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

    email = serializers.CharField(source='user', required=False)
    status_nm = serializers.CharField(source='status', required=False)

    def to_representation(self, instance):
        data = super(UserProfileSerializer, self).to_representation(instance)
        data['user_special'] = UserSpecial.objects.filter(user=instance.user).values()
        # 속도
        # if instance.user:
        #     queryset = UserSpecial.objects.filter(user=instance.user)
        #     data['user_special'] = UserSpecialSerializer(queryset, many=True).data
        return data


'''
class JikJongSerializer(serializers.ModelSerializer):
    code_id = serializers.PrimaryKeyRelatedField(queryset=ComCode.objects.all().values('code_id'))

    class Meta:
        model = UserSpecial
        fields = ('code_id', 'jikjong_mid',)

    def to_representation(self, instance):
        data = super(JikJongSerializer, self).to_representation(instance)
        if data['code_id']:
            data['label'] = str(ComCode.objects.filter(code_id=data['code_id']).values('code_name')[0]['code_name'])
            data['value'] = data['code_id']
            del(data['code_id'])
            del(data['jikjong_mid'])
        return data
'''


# 경력사항
class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = '__all__'


# 학력사항
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


# 학력사항
class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


# 이력서
class ResumeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

    userspecial = serializers.PrimaryKeyRelatedField(queryset=UserSpecial.objects.all())
    # userspecial = serializers.PrimaryKeyRelatedField(read_only=True)
    except_company = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    careers = CareerSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)


class UserSpecialSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    # user = serializers.
    jikjong_top = ComCodeSerializer()
    jikjong_mid = ComCodeSerializer()
    jikjong_low = ComCodeSerializer(many=True)
    career_gigan = serializers.IntegerField()
    salary_gb = serializers.CharField()
    currency_gb = serializers.CharField()
    salary_amt = serializers.IntegerField()
    hope_salary = serializers.IntegerField()
    urlkey = serializers.CharField()
    open_yn = serializers.BooleanField()
    answers_json = serializers.JSONField()
    created_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    modified_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    resume = ResumeModelSerializer(many=True, read_only=True)


class UserSpecialModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSpecial
        fields = '__all__'
        read_only_fields = ('entry_date', )

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    # jikjong_top = serializers.CharField()
    # jikjong_mid = serializers.CharField()
    # jikjong_top_nm = serializers.CharField(source='jikjong_top', required=False)
    # jikjong_mid_nm = serializers.CharField(source='jikjong_mid', required=False)
    # jikjong_low = serializers.PrimaryKeyRelatedField(queryset=ComCode.objects.all(), many=True, required=False)

    # resume = ResumeModelSerializer(many=True, read_only=True)

    # def create(self, validated_data):
    #     print('UserSpecialModelSerializer validate_data', validated_data)
    #     return UserSpecial(**validated_data)
        # jikjong_low = validated_data.get('jikjong_low', None)
        # user = self.context['request'].user
        # print('jikjong_top', validated_data.get('jikjong_top', None))
        # print('user', user)
        #
        # userSpecial, created = UserSpecial.objects.update_or_create(
        #     jikjong_top=validated_data.get('jikjong_top', None),
        #     jikjong_mid=validated_data.get('jikjong_mid', None),
        #     # user=validated_data.get('user', None),
        #     user=user,
        #     defaults={
        #         # 'jikjong_mid': validated_data.get('jikjong_mid', None),
        #         'career_gigan': validated_data.get('career_gigan', None),
        #         'hope_salary': validated_data.get('hope_salary', None),
        #         'answers_json': validated_data.get('answers_json', None)
        #     }
        # )
        # # todo 이력을 어떻게 남길지
        # if created:
        #     print('created', created)
        # else:
        #     print('created', created)
        #
        # if jikjong_low:
        #     # 초기화 후 ADD
        #     userSpecial.jikjong_low.clear()
        #     for list in jikjong_low:
        #         userSpecial.jikjong_low.add(list)

        # return userSpecial


class ResumeSerializer(serializers.Serializer):
    # userspecial = UserSpecialSerializer()
    userspecial = serializers.PrimaryKeyRelatedField(queryset=UserSpecial.objects.all())
    resume_title = serializers.CharField()
    resume_username = serializers.CharField()
    resume_phone = serializers.CharField()
    resume_birth = serializers.CharField()
    resume_status = ComCodeSerializer()
    introduce = serializers.CharField()
    entry_date = serializers.DateTimeField()
    modify_date = serializers.DateTimeField()
    open_yn = serializers.BooleanField()
    except_company = ComCodeSerializer(many=True)
    urlkey = serializers.CharField()
    resume_file = serializers.FileField()
    resume_filename = serializers.CharField()
    except_company = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    careers = CareerSerializer(many=True, read_only=True)
    educations = EducationSerializer(many=True, read_only=True)
    languages = LanguageSerializer(many=True, read_only=True)
    # companyprofile = models.ForeignKey("company_profile.CompanyProfile", on_delete=models.CASCADE,
    #                                    blank=True, null=True, verbose_name='등록한회사',
    #                                    default=1)  # 겟스로우

    # def get_jikjong_top(self, obj):


# 광고URL
class UserAdvKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdvKey
        fields = '__all__'

    def to_representation(self, instance):
        from company_profile.serializers import JobAdSerializer
        data = super(UserAdvKeySerializer, self).to_representation(instance)
        if data['jobadvertise']:
            data['jobadvertise'] = JobAdSerializer(instance.jobadvertise).data
        return data


# 기업광고URL
class CompanyAdvKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAdvKey
        fields = '__all__'


# 관심공고
class InterestAdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestAdv
        fields = '__all__'


# 관심수급
class InterestSugubSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestSugub
        fields = ['id', 'sugub']
        read_only_fields = ['user']

    def to_representation(self, instance):
        from company_profile.serializers import SugubSimpleSerializer
        return {
            'id': instance.id,
            'sugub': SugubSimpleSerializer(instance.sugub).data,
        }


# 사용자환급금
class UserPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPoint
        fields = '__all__'

    poi_type_nm = serializers.CharField(source='poi_type', required=False)


# 아임포트 결제 내역
class ImportPaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportPaymentHistory
        fields = '__all__'

    def create(self, validated_data):
        paid_amount = validated_data.get('paid_amount', None)
        # 액세스 토큰(access token) 발급 받기
        url = 'https://api.iamport.kr/users/getToken'
        headers = {
            'Content-type': 'application/json'
        }
        body = {
            'imp_key': 'imp_apikey',
            'imp_secret': 'ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f'
        }
        data = json.dumps(body)
        response = requests.post(url, headers=headers, data=data)
        access_token = response.json()['response']['access_token']

        print('paid_amount:', paid_amount)

        '''결제요청'''
        if paid_amount is not None:
            user = validated_data['user']
            imp_uid = validated_data['imp_uid']
            amount = validated_data['paid_amount']

            # imp_uid로 아임포트 서버에서 결제 정보 조회
            url = "https://api.iamport.kr/payments/{}".format(imp_uid)
            headers = {
                'Authorization': access_token
            }
            response = requests.get(url, headers=headers)
            paymentData = response.json()
            # DB에서 결제되어야 하는 금액 조회
            order = paymentData['response']
            amountToBePaid = order['amount']
            status = order['status']
            # 결제 검증하기
            if amount == amountToBePaid:
                if status == 'paid': # 결제완료
                    payment = ImportPaymentHistory.objects.create(**validated_data)
                    ticket = amount / 1000
                    obj = CompanyProfile.objects.get(user=user)
                    obj.set_ticket(ticket=ticket)
                    obj.save()
                    return payment
                elif status == 'ready':
                    raise serializers.ValidationError({'message': '가상 계좌 발급 서비스 오픈x'})
            else:
                raise serializers.ValidationError({'message': '위조된 결제시도'})

        else:
            user = validated_data['user']
            imp_uid = validated_data['imp_uid']
            reason = validated_data['reason']
            cancel_request_amount = validated_data['cancel_request_amount']
            # 결제정보
            if imp_uid == ImportPaymentHistory.objects.filter(imp_uid=imp_uid).values('imp_uid')[0]['imp_uid']:
                url = "https://api.iamport.kr/payments/cancel"
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': access_token
                }
                body = {
                    'reason': reason,
                    'imp_uid': imp_uid,
                    'amount': cancel_request_amount
                }
                data = json.dumps(body)
                response = requests.post(url, headers=headers, data=data)
                # calcelData = response.json()
                # 티켓환불
                ticket = cancel_request_amount / 1000
                obj = CompanyProfile.objects.get(user=user)
                obj.use_ticket(ticket=ticket)
                obj.save()
                
                obj = ImportPaymentHistory.objects.get(imp_uid=imp_uid)
                instance = super(ImportPaymentHistorySerializer, self).update(obj, validated_data)
                instance.save()
                return obj
            else:
                raise serializers.ValidationError({'message': '환불 실패'})

# 유저 리뷰
class UserCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComment
        fields = '__all__'