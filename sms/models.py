from django.db import models
from django.utils import timezone
from random import randint
from backend.models import TimeStampedModel
import datetime, hashlib, hmac, base64, time
import requests, datetime

def make_signature():
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)

    access_key = "Lgi8uEwIQhFkoHlQLYlU"				# access key id (from portal or Sub Account)
    secret_key = "YKQ3OZVITDaloogVuWEoNolZJfIo5kHJd2xSG9st"				# secret key (from portal or Sub Account)
    secret_key = bytes(secret_key, 'UTF-8')

    method = "POST"
    uri = "/sms/v2/services/ncp:sms:kr:259250411254:chaegong/messages"

    message = method + " " + uri + "\n" + timestamp + "\n" + access_key
    message = bytes(message, 'UTF-8')
    signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
    return signingKey


# 정보성 SMS/LMS/MMS 발송 Modal
class InfoSms(TimeStampedModel):
    from_number = models.CharField(max_length=11, verbose_name='발신번호')
    to_number = models.CharField(max_length=11, verbose_name='수신번호')
    contents = models.CharField(max_length=500, verbose_name='SMS내용')

    class Meta:
        verbose_name_plural = ('Info문자 / InfoSms')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.send_sms()

    def send_sms(self):
        SMS_URL = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:259250411254:chaegong/messages'
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': str(int(time.time() * 1000)),
            'x-ncp-iam-access-key': 'Lgi8uEwIQhFkoHlQLYlU',
            'x-ncp-apigw-signature-v2': make_signature(),
        }
        data = {
            "type": "SMS",
            "contentType": "COMM",
            "countryCode": "82",
            # "from": self.from_number,
            "from": "01063455347",
            "content": self.contents,
            "messages": [
                {
                    "to": self.to_number
                }
            ]
        }
        requests.post(SMS_URL, headers=headers, json=data)


# 회원가입 휴대폰 인증 Model
class AuthSms(TimeStampedModel):
    phone_number = models.CharField(max_length=11, primary_key=True)
    auth_number = models.IntegerField()

    class Meta:
        verbose_name_plural = ('문자인증 / AuthSms')
        db_table = 'auth_sms'

    def save(self, *args, **kwargs):
        self.auth_number = randint(1000, 10000)
        super().save(*args, **kwargs)
        self.send_sms()

    def send_sms(self):
        SMS_URL = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:259250411254:chaegong/messages'
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': str(int(time.time() * 1000)),
            'x-ncp-iam-access-key': 'Lgi8uEwIQhFkoHlQLYlU',
            'x-ncp-apigw-signature-v2': make_signature(),
        }
        data = {
            "type": "SMS",
            "contentType": "COMM",
            "countryCode": "82",
            "from": "01063455347",
            # "subject":"string", # LMS, MMS에서만 사용 가능
            "content": "[채용공고] 인증번호 : [{}]를 입력해주세요.".format(self.auth_number),
            "messages": [
                {
                    "to": self.phone_number
                    # "subject": "string", #LMS, MMS에서만 사용 가능
                    # "content": "string"
                }
            ]
            # "files":[
            #     {
            #         "name":"string",
            #         "body":"string"
            #     }
            # ],
            # "reserveTime": "yyyy-MM-dd HH:mm",
            # "reserveTimeZone": "string",
            # "scheduleCode": "string"
        }
        requests.post(SMS_URL, headers=headers, json=data)

    @classmethod
    def check_auth_number(cls, p_num, c_num):
        time_limit = timezone.now() - datetime.timedelta(minutes=5)
        p_num = p_num.replace('-','')

        result = cls.objects.filter(
            phone_number=p_num,
            auth_number=c_num,
            modified_time__gte=time_limit
        )
        if result:
            return True

        return False