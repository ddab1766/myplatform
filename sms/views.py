from django.shortcuts import render
from django.http import Http404, JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from sms.models import AuthSms


# 회원가입 휴대폰 인증 View
class AuthSmsSendView(APIView):
    def get(self, request):
        try:
            p_num = request.query_params['phone_number']
            a_num = request.query_params['auth_number']
        except KeyError:
            return Response({'phone': ['에러']}, status=status.HTTP_400_BAD_REQUEST)
        else:
            result = AuthSms.check_auth_number(p_num, a_num)
            return Response({'message': 'OK', 'result': result})

    def post(self, request):
        try:
            p_num = request.data['phone_number']
            p_num = p_num.replace('-', '')
            if len(p_num) != 11:
                return Response({'phone': ['11자리가 아닙니다.']}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({'phone': ['에러']}, status=status.HTTP_400_BAD_REQUEST)
        else:
            AuthSms.objects.update_or_create(phone_number=p_num)
            return Response({'message': 'OK'})


# 정보성 SMS/LMS/MMS 발송 View
# class InfoSmsSendView(APIView):
#     def post(self, request):
#         try:
#             from_number = request.data['from_number'].replace('-', '')
#             to_number   = request.data['to_number'].replace('-', '')
#             contents    = request.data['contents']
#         except KeyError:
#             return Response({'KeyError'}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             InfoSms.objects.create(from_number=from_number, to_number=to_number, contents=contents)
#             return Response({'message': 'OK'})