from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from django.db.models import Q, Prefetch
import urllib.request
import json
from rest_framework.response import Response
from rest_framework import viewsets, permissions, generics, status

from .models import UserProfile, UserSpecial, Resume, Career, Education, UserAdvKey, CompanyAdvKey, InterestAdv, \
    Language, UserComment, InterestSugub
from .serializers import UserProfileSerializer, UserSpecialModelSerializer, ResumeModelSerializer, CareerSerializer, \
    EducationSerializer, UserAdvKeySerializer, CompanyAdvKeySerializer, InterestAdvSerializer, \
    ImportPaymentHistorySerializer, LanguageSerializer, UserCommentSerializer, UserSpecialSerializer, \
    InterestSugubSerializer

from user_profile.permissions import IsOwnerOnly
from backend.models import User, ComCode, Answer
from company_profile.models import JobAdvertise, ImportPaymentHistory


class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = UserProfile.objects \
            .select_related('recuser') \
            .prefetch_related('user__userspecial',)\
            .all()
        recuser = self.request.query_params.get('recuser', None)
        # user = self.request.query_params.get('user', None)
        if recuser is not None:
            return queryset.filter(recuser=recuser)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = UserProfile.objects\
            .select_related('recuser')\
            .all()
        recuser = self.request.query_params.get('recuser', None)
        if recuser:
            return queryset.filter(recuser=recuser)
        else:
            return queryset


# todo
class UserSpecialReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserSpecial.objects.all()
    serializer_class = UserSpecialSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = UserSpecial.objects \
            .select_related('user', 'jikjong_top', 'jikjong_mid') \
            .prefetch_related('jikjong_low') \
            .prefetch_related(Prefetch('resume',
                                       queryset=Resume.objects.prefetch_related('except_company', 'careers',
                                                                                'educations', 'languages'))) \
            .all()

        jikjong_top = self.request.query_params.get('jikjong_top', None)
        jikjong_mid = self.request.query_params.get('jikjong_mid', None)
        if jikjong_top:
            queryset = queryset.filter(jikjong_top=jikjong_top)
        if jikjong_mid:
            queryset = queryset.filter(jikjong_mid=jikjong_mid)

        return queryset


class UserSpecialListView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, IsOwnerOnly]
    queryset = UserSpecial.objects.all()
    serializer_class = UserSpecialModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'user']

    def get_queryset(self):
        queryset = UserSpecial.objects \
            .select_related('user', 'jikjong_top', 'jikjong_mid') \
            .prefetch_related('jikjong_low') \
            .prefetch_related(Prefetch('resume',
                                       queryset=Resume.objects.prefetch_related('except_company', 'careers',
                                                                                'educations', 'languages'))) \
            .all()

        jikjong_top = self.request.query_params.get('jikjong_top', None)
        jikjong_mid = self.request.query_params.get('jikjong_mid', None)
        if jikjong_top:
            queryset = queryset.filter(jikjong_top=jikjong_top)
        if jikjong_mid:
            queryset = queryset.filter(jikjong_mid=jikjong_mid)

        return queryset


class UserSpecialViewSet(viewsets.ModelViewSet):
    queryset = UserSpecial.objects.all() #.order_by('-date_joined')
    serializer_class = UserSpecialModelSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self, *args, **kwargs):
        queryset = UserSpecial.objects \
            .select_related('user', 'jikjong_top', 'jikjong_mid')\
            .prefetch_related('jikjong_low') \
            .prefetch_related(Prefetch('resume',
                                       queryset=Resume.objects.prefetch_related('except_company', 'careers', 'educations', 'languages'))) \
            .all()

        user        = self.request.query_params.get('user', None)
        jikjong_top = self.request.query_params.get('jikjong_top', None)
        jikjong_mid = self.request.query_params.get('jikjong_mid', None)
        if user:
            queryset = queryset.filter(user=user)
        if jikjong_top:
            queryset = queryset.filter(jikjong_top=jikjong_top)
        if jikjong_mid:
            queryset = queryset.filter(jikjong_mid=jikjong_mid)

        return queryset


# 이력서 ListView
class ResumeListView(generics.ListAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeModelSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['userspecial']

    def get_queryset(self, *args, **kwargs):
        queryset = Resume.objects\
            .prefetch_related('except_company', 'careers', 'educations', 'languages')\
            .select_related('hrprofile', 'resume_status')\
            .all()
        user = self.request.query_params.get('user', None)
        id = self.request.query_params.get('id', None)
        userspecial = self.request.query_params.get('userspecial', None)

        if id is not None:
            return queryset.filter(id=id)
        if user:
            return queryset.filter(userspecial__user_id=user)

        filters = {
            'userspecial' : userspecial,
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))
        # return queryset


class ResumeViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = Resume.objects.all()
    serializer_class = ResumeModelSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Resume.objects\
            .prefetch_related('except_company', 'careers', 'educations', 'languages')\
            .select_related('hrprofile', 'resume_status')\
            .all()
        user_id = self.request.query_params.get('user_id', None)
        userspecial = self.request.query_params.get('userspecial', None)

        if user_id:
            return queryset.filter(userspecial__user_id=user_id)

        filters = {
            # 'userspecial': self.request.query_params.get('userspecial', ''),
            'userspecial' : userspecial,
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class CareerViewSet(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Career.objects.all()
        resume = self.request.query_params.get('resume', None)

        if resume:
            queryset = queryset.filter(resume=resume)
            return queryset

        return queryset


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Education.objects.all()
        filters = {
            'resume' : self.request.query_params.get('resume', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


# 유저소개 URL
class UserAdvKeyViewSet(viewsets.ModelViewSet):
    queryset = UserAdvKey.objects.all()
    serializer_class = UserAdvKeySerializer

    def get_queryset(self, *args, **kwargs):
        queryset = UserAdvKey.objects.all()
        filters = {
            'user' : self.request.query_params.get('user', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


# 기업소개 URL
class CompanyAdvKeyViewSet(viewsets.ModelViewSet):
    queryset = CompanyAdvKey.objects.all()
    serializer_class = CompanyAdvKeySerializer

    def get_queryset(self, *args, **kwargs):
        queryset = CompanyAdvKey.objects.all()
        filters = {
            'user' : self.request.query_params.get('user', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


# 관심공고
class InterestAdvViewSet(viewsets.ModelViewSet):
    queryset = InterestAdv.objects.all()
    serializer_class = InterestAdvSerializer


def NaverShortUrl(request):
    client_id = "O8HDAY3ppTe_Bw6vkRAt"  # 개발자센터에서 발급받은 Client ID 값
    client_secret = "9zymkKQZLp"  # 개발자센터에서 발급받은 Client Secret 값
    upid = request.GET.get('upid', '')
    user = request.GET.get('user', '')
    if upid != '':
        print('upid1:', upid)
        encText = urllib.parse.quote("{}User/List/".format(settings.URL_FRONT) + upid + "/" + user)
    else:
        print('upid2:', upid)
        encText = urllib.parse.quote("{}Company/Home/".format(settings.URL_FRONT) + user)
    data = "url=" + encText
    url = "https://openapi.naver.com/v1/util/shorturl"
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request, data=data.encode("utf-8"))
    rescode = response.getcode()
    print(rescode)

    if (rescode == 200):
        response_body = response.read()
        shortUrl = ( json.loads(response_body.decode('utf-8')).pop('result', {}))
        if upid != '':
            obj, created = UserAdvKey.objects.get_or_create(
                jobadvertise=JobAdvertise.objects.get(id=upid),
                user=User.objects.get(id=user),
                hash=shortUrl['hash'],
                url=shortUrl['url'],
                orgUrl=shortUrl['orgUrl'],
            )
        elif upid == '':
            obj, created = CompanyAdvKey.objects.get_or_create(
                user=User.objects.get(id=user),
                hash=shortUrl['hash'],
                url=shortUrl['url'],
                orgUrl=shortUrl['orgUrl'],
            )


        print(response_body.decode('utf-8'))
    else:
        print("Error Code:" + rescode)

    return HttpResponse(response_body.decode('utf-8'))


# import 결제 모듈
class ImportPaymentHistoryViewSet(viewsets.ModelViewSet):
    queryset = ImportPaymentHistory.objects.all()
    serializer_class = ImportPaymentHistorySerializer


# 유저 리뷰
class UserCommentViewSet(viewsets.ModelViewSet):
    queryset = UserComment.objects.all()
    serializer_class = UserCommentSerializer
    def get_queryset(self, *args, **kwargs):
        queryset = UserComment.objects.all()
        filters = {
            'user' : self.request.query_params.get('user', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class InterestSugubModelViewSet(viewsets.ModelViewSet):
    """
    param: {
        sugub:수급번호
    }
    """
    queryset = InterestSugub.objects.all()
    serializer_class = InterestSugubSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # def destroy(self, request, *args, **kwargs):
    #     sugub = request.GET.get('sugub')
    #     try:
    #         obj = self.get_queryset().get(user=self.request.user, sugub=sugub)
    #         obj.delete()
    #     except InterestSugub.DoesNotExist:
    #         return Response(data='DoesNotExist', status=status.HTTP_400_BAD_REQUEST)
    #
    #     return Response(data='delete success')

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return None
        else:
            return user.interestsugub_user.all()
