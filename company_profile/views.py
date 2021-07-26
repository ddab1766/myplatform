import django_filters
from django.db.models import Q, Prefetch
import datetime
from backend.models import (
    Notification, Point, ComCode, User
)
from backend.serializers import NotificationSerializer
from backend.filters import EndFilter
from django.utils.dateformat import DateFormat
from rest_framework.decorators import action, api_view
from rest_framework.filters import SearchFilter
from rest_framework_filters.backends import RestFrameworkFilterBackend
from user_profile.models import Resume
from hr_profile.models import HrProfile

from user_profile.serializers import InterestSugubSerializer



from .serializers import (
    CompanyProfileModelSerializer, SugubModelSerializer, SugubSerializer, JobAdSerializer,
    JobAppModelSerializer,
    SugubReviewModelSerializer, CompanyProfileCoWorkerModelSerializer, JobQuestionSerializer,
    JobAnswerSerializer, CompanyProfileSerializer, CompanyProfileSimpleSerializer,
    SugubSimpleSerializer, JobAdModelSerializer, JobAppSerializer, SugubReviewSerializer, InterviewModelSerializer,
    EstimateModelSerializer, JobAppHrSerializer, SugubHrSerializer, SugubListSerializer, SugubHrListSerializer,
    SugubSignModelSerializer)

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from .models import CompanyProfile, Sugub, JobAdvertise, JobApplicant, SugubReview, CompanyProfileCoWorker, JobQuestion, \
    JobAnswer, Interview, Estimate, SugubSign
from django.db import connection
from django_filters.rest_framework import DjangoFilterBackend
import rest_framework_filters as filters


class CompanyProfileReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user']
    pagination_class = None

    def get_queryset(self):
        queryset = CompanyProfile.objects \
            .select_related('status_cd', 'company_recuser', 'cmp_manager') \
            .prefetch_related('user', ) \
            .prefetch_related(Prefetch('company_sugub',
                                       queryset=Sugub.objects
                                       .select_related('user', 'sugub_jikjong_top', 'sugub_jikjong_mid',
                                                       'sugub_career_gb', 'education_cd', 'chae_cd', 'sugub_status',
                                                       'cont_chg_gb', 'work_type',
                                                       'chae_gigan_type', 'sugub_gender', 'salary_gubun', 'manager')
                                       .prefetch_related('sugub_jikjong_low',)
                                       .prefetch_related(Prefetch('sugub_reviews',
                                                                  queryset=SugubReview.objects
                                                                  .select_related('user', 'hrprofile__cmp_manager')
                                                                  .prefetch_related(Prefetch('sugubreview_point',
                                                                                             queryset=Point.objects
                                                                                             .select_related(
                                                                                                 'point_gubun')))
                                                                  )) \
                                       .prefetch_related(Prefetch('jobadvertise',
                                                                  queryset=JobAdvertise.objects
                                                                  .select_related('jobadvertise_status', 'job_manager',
                                                                                  'job_reward_type', 'job_reward_way')
                                                                  .prefetch_related(Prefetch('jobapplicants',
                                                                                             queryset=JobApplicant.objects.select_related(
                                                                                                 'user',
                                                                                                 'applied_status',
                                                                                                 'hrprofile__cmp_manager',
                                                                                                 'jobadvertise')
                                                                                             .prefetch_related(
                                                                                                 Prefetch('resume',
                                                                                                          queryset=Resume.objects
                                                                                                          .select_related(
                                                                                                              'userspecial')
                                                                                                          .prefetch_related(
                                                                                                              'careers',
                                                                                                              'languages',
                                                                                                              'educations',
                                                                                                              'except_company')
                                                                                                          ))
                                                                                             )))
                                                         ))) \
            .prefetch_related(Prefetch('company_coworker',
                                       queryset=CompanyProfileCoWorker.objects
                                       .select_related('user', 'companyprofile_auth')
                                       )) \
            .all()
        custid = self.request.query_params.get('custid', None)
        if custid is not None:
            queryset = queryset.filter(custid=custid)

        return queryset

    @action(detail=False)
    def simple(self, request, pk=None):
        instance = CompanyProfile.objects.all()
        serializer = CompanyProfileSimpleSerializer(instance, many=True)
        return Response(serializer.data)


class CompanyProfileViewSet(viewsets.ModelViewSet):
    queryset = CompanyProfile.objects.all()
    permission_classes = [permissions.IsAuthenticated, ]
    # permission_classes = [permissions.AllowAny, ]

    serializer_class = CompanyProfileModelSerializer
    pagination_class = None

    # def perform_create(self, serializer):
    #     user = self.request.user
    #     serializer.save()


    def get_queryset(self):
        queryset = CompanyProfile.objects \
            .select_related('status_cd', 'company_recuser') \
            .prefetch_related('user') \
            .prefetch_related(Prefetch('company_sugub',
                                       queryset=Sugub.objects.select_related('sugub_jikjong_top', 'sugub_jikjong_mid',
                                                                             'sugub_career_gb', 'education_cd',
                                                                             'chae_cd', 'sugub_status',
                                                                             'cont_chg_gb', 'work_type',
                                                                             ))) \
            .prefetch_related(Prefetch('company_sugub__jobadvertise',
                                       queryset=JobAdvertise.objects.select_related('jobadvertise_status',
                                                                                    'job_reward_type',
                                                                                    'job_reward_way'))) \
            .all()

        # user            = self.request.query_params.get('user', None)
        user            = self.request.user
        company_recuser = self.request.query_params.get('company_recuser', None)
        custid          = self.request.query_params.get('custid', None)
        status_cd          = self.request.query_params.get('status_cd', None)
        if company_recuser is not None:
            # return queryset.filter(company_recuser=user).exclude(custid=None)
            return queryset.filter(company_recuser=company_recuser).exclude(custname=None)

        # user = User.objects.get(email='jhl0906@naver.com')
        if user.is_admin:
            queryset = queryset
        elif user is not None:
            queryset = queryset.filter(user=user)

        if custid is not None:
            queryset = queryset.filter(custid=custid)
        # if status_cd is not None:
        #     queryset = queryset.filter(status_cd=status_cd)

        return queryset


class CompanyProfileCoWorkerViewSet(viewsets.ModelViewSet):
    """
    본인이 속한 회사정보의 동료 조회
    """
    queryset = CompanyProfileCoWorker.objects.all()
    serializer_class = CompanyProfileCoWorkerModelSerializer

    def get_queryset(self):
        queryset = CompanyProfileCoWorker.objects.select_related('user', 'companyprofile_auth').all()
        user = self.request.user
        # user = User.objects.get(email='company1@company.com')
        if user.is_anonymous:
            return None
        else:
            companyprofile, hrprofile = user.check_profile(user)
            queryset = queryset.filter(companyprofile=companyprofile)
            return queryset

# 수급필터
class SugubFilter(filters.FilterSet):
    sugub_title = filters.CharFilter(lookup_expr='contains')
    chae_cd = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AC') & Q(code_topcd=None)))
    sugub_career_gb = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AB') & Q(code_topcd=None)))
    sugub_status = filters.ModelMultipleChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='CC') & Q(code_topcd=None)))
    education_cd = filters.ModelChoiceFilter(queryset=ComCode.objects.filter(Q(code_topidx='AO') & Q(code_topcd=None)))
    sugub_jikjong_top = filters.ModelChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='AA') & Q(code_topcd=None)))
    sugub_jikjong_mid = filters.ModelChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='AA') & Q(code_id__endswith='000') & ~Q(code_topcd=None)))


class SugubReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = Sugub.objects \
        .select_related('user', 'manager', 'chae_cd', 'sugub_career_gb', 'education_cd', 'sugub_gender', 'salary_gubun', 'cont_chg_gb', 'work_type', ) \
        .select_related('sugub_jikjong_top', 'sugub_jikjong_mid', 'sugub_status', 'chae_gigan_type') \
        .prefetch_related('sugub_jikjong_low') \
        .prefetch_related(Prefetch('sugub_reviews',
                                   queryset=SugubReview.objects
                                   .select_related('user')
                                   .prefetch_related(Prefetch('hrprofile',
                                                              queryset=HrProfile.objects
                                                              .select_related('status_cd')
                                                              .prefetch_related('user', 'service_address', 'services')
                                                              ))
                                   .prefetch_related(Prefetch('sugubreview_point',
                                                              queryset=Point.objects
                                                              .select_related('point_gubun'))))) \
        .prefetch_related(Prefetch('companyprofile',
                                   queryset=CompanyProfile.objects
                                   .select_related('cmp_manager', 'company_recuser', 'status_cd')
                                   .prefetch_related('user'))) \
        .prefetch_related(Prefetch('jobadvertise',
                                   queryset=JobAdvertise.objects \
                                   .select_related('jobadvertise_status', 'job_reward_type', 'job_reward_way') \
                                   .prefetch_related('job_manager')
                                   .prefetch_related(Prefetch('jobapplicants',
                                                              queryset=JobApplicant.objects.select_related('user', 'applied_status',
                                                                                                           'hrprofile__status_cd', 'jobadvertise')
                                                              .prefetch_related(Prefetch('resume', queryset=Resume.objects
                                                                                         .select_related('userspecial')
                                                                                         .prefetch_related('careers', 'languages', 'educations', 'except_company')
                                                                                         )))))) \
        .all()
    serializer_class = SugubSerializer
    # filter_backends = [SearchFilter, RestFrameworkFilterBackend]
    filter_backends = [RestFrameworkFilterBackend]
    filter_class = SugubFilter
    # search_fields = ['sugub_title', 'work_position', 'companyprofile__custname']

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def my_sugub(self, request, pk=None):
        """내가 등록한 수급"""
        ordering = request.GET.get('ordering', '1')
        qs = self.filter_queryset(self.get_queryset())
        user = request.user
        # user = User.objects.get(email='hr1@hr.com')
        # qs = qs.filter(jobadvertise__jobapplicants__hrmanager=request.user).distinct('id')
        qs = qs.filter(jobadvertise__jobapplicants__hrmanager=user).order_by('id').distinct()

        if ordering == '1':   # 등록 순
            qs = sorted(qs, key=lambda t: t.created_at, reverse=True)
        elif ordering == '2': # 마감일 순
            qs = sorted(qs, key=lambda t: t.sugub_end_dt, reverse=False)
        elif ordering == '3': # 지원자수 순
            qs = sorted(qs, key=lambda t: t.applicants_count, reverse=True)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = SugubSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SugubSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.IsAuthenticated])
    def favorite_sugub(self, request, pk=None):
        """ 관심수급 """
        ordering = request.GET.get('ordering', '1')
        qs = self.filter_queryset(self.get_queryset())
        qs = qs.filter(interestsugub__user=request.user)

        if ordering == '1':   # 등록 순
            qs = sorted(qs, key=lambda t: t.created_at, reverse=True)
        elif ordering == '2': # 마감일 순
            qs = sorted(qs, key=lambda t: t.sugub_end_dt, reverse=False)
        elif ordering == '3': # 지원자수 순
            qs = sorted(qs, key=lambda t: t.applicants_count, reverse=True)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = SugubHrSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SugubHrSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def hr(self, request, pk=None):
        ordering = request.GET.get('ordering', '1')
        qs = self.filter_queryset(self.get_queryset())

        if ordering == '1':   # 등록 순
            qs = sorted(qs, key=lambda t: t.created_at, reverse=True)
        elif ordering == '2': # 마감일 순
            qs = sorted(qs, key=lambda t: t.sugub_end_dt, reverse=False)
        elif ordering == '3': # 지원자수 순
            qs = sorted(qs, key=lambda t: t.applicants_count, reverse=True)

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = SugubHrSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SugubHrSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def card_list(self, request, *args, **kwargs):
        qs = self.filter_queryset(self.get_queryset())

        # qs = qs.filter(sugub_end_dt__gte=datetime.datetime.now())
        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = SugubListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = SugubListSerializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[permissions.AllowAny])
    def get_applicants(self, request, pk=None):
        user = request.user

        if user.is_anonymous:
            return Response(None)
        else:
            companyprofile, hrprofile = user.check_profile(user)
            qs = self.filter_queryset(self.get_queryset())
            print('hrprofile;', hrprofile)
            qs = qs.filter(jobadvertise__jobapplicants__hrprofile=hrprofile)
            serializer = SugubSerializer(qs, many=True)
            # serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = self.queryset.all()

        user = self.request.user

        if self.action != 'card_list':
            queryset = queryset\
                .prefetch_related(Prefetch('estimate_sugub', queryset=Estimate.objects
                                            .select_related('hrprofile', 'user')
                                            .prefetch_related('estimate_file'))) \


        try:
            companyprofile, hrprofile = user.check_profile(user)
        except:
            companyprofile, hrprofile = None, None
        try:
            companyprofile_coworker = CompanyProfileCoWorker.objects.get(user=user)
            if isinstance(companyprofile_coworker, CompanyProfileCoWorker):
                auth = companyprofile_coworker.companyprofile_auth.code_id
            else:
                auth = None
        except:
            auth = None

        print('auth?', auth)

        if user.is_staff:
            queryset = queryset
        elif auth == 'CG0200000': # 관리자 권한
            queryset = queryset.filter(sugub_end_dt__gte=datetime.datetime.now())
            queryset = queryset.filter(companyprofile=companyprofile)
        elif auth == 'CG0100000': # 기본 권한
            queryset = queryset.filter(sugub_end_dt__gte=datetime.datetime.now())
            queryset = queryset.filter(user=user)
        else:
            queryset = queryset.filter(sugub_end_dt__gte=datetime.datetime.now())
            # 수급검토중,공고 x 제외
            queryset = queryset.filter(~Q(sugub_status__code_id='CC0100000') & ~Q(jobadvertise__isnull=True))

        queryset = queryset.order_by('-created_at')
        # if queryset is not None:
        #     queryset = queryset.order_by(conditions[int(ordering)])

        return queryset


# 채용의뢰서 결재 및 담당자 지정
class SugubSignModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = SugubSign.objects.all()
    serializer_class = SugubSignModelSerializer
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(sanctioner=user)


class SugubModelViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    queryset = Sugub.objects.all()
    serializer_class = SugubModelSerializer
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.user
        companyprofile, hrprofile = user.check_profile(user)
        serializer.save(user=self.request.user, companyprofile=companyprofile)

    def get_queryset(self):
        queryset = Sugub.objects \
            .select_related('chae_cd', 'sugub_career_gb', 'education_cd', ) \
            .select_related('sugub_jikjong_top', 'sugub_jikjong_mid', 'sugub_status', 'cont_chg_gb', 'work_type',) \
            .prefetch_related('sugub_jikjong_low') \
            .prefetch_related(Prefetch('companyprofile',
                                       queryset=CompanyProfile.objects.prefetch_related('cmp_manager'))) \
            .prefetch_related(Prefetch('jobadvertise',
                                       queryset=JobAdvertise.objects.select_related('jobadvertise_status',
                                                                                    'job_reward_type',
                                                                                    'job_reward_way'))) \
            .all() \

        filters = {
            'companyprofile': self.request.query_params.get('companyprofile', ''),
            'user': self.request.query_params.get('user', ''),
            'sugub_status': self.request.query_params.get('sugub_status', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class JobAdReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobAdvertise.objects.all()
    serializer_class = JobAdSerializer

    def get_queryset(self):
        queryset = JobAdvertise.objects \
            .select_related('sugub') \
            .select_related('jobadvertise_status', 'job_reward_type', 'job_reward_way') \
            .prefetch_related(Prefetch('jobapplicants', \
                                       queryset=JobApplicant.objects.select_related('user', 'applied_status',
                                                                                    'hrprofile', 'jobadvertise')
                                       .prefetch_related(Prefetch('resume', queryset=Resume.objects
                                                                  .select_related('userspecial')
                                                                  .prefetch_related('careers', 'languages', 'educations', 'except_company')
                                                                  ))
                                       .all()
                                       )) \
            .all()
        filters = {
            'sugub__custid': self.request.query_params.get('custid', ''),
            'sugub': self.request.query_params.get('sugub', ''),
            'id': self.request.query_params.get('jobid', ''),
            'jobadvertise_status': self.request.query_params.get('status', ''),
            # 'sugub__sugub_jikjong_top': self.request.query_params.get('code_id', ''),
            'sugub__sugub_jikjong_top': self.request.query_params.get('sugub_jikjong_top', ''),
            'sugub__sugub_jikjong_mid': self.request.query_params.get('sugub_jikjong_mid', ''),
            'jobadvertise_end_dt__gte': self.request.query_params.get('jobadvertise_end_dt', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))
        return queryset


class JobAdListViewSet(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = JobAdvertise.objects.all()
    serializer_class = JobAdSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['sugub__sugub_jikjong_top', 'jobadvertise_status']

    def get_queryset(self):
        queryset = JobAdvertise.objects \
            .select_related('sugub') \
            .select_related('jobadvertise_status', 'job_reward_type', 'job_reward_way') \
            .prefetch_related(Prefetch('jobapplicants', \
                                       queryset=JobApplicant.objects.select_related('user', 'applied_status',
                                                                                    'hrprofile', 'resume',
                                                                                    'jobadvertise'))) \
            .all()

        filters = {
            'sugub__custid': self.request.query_params.get('custid', ''),
            'sugub': self.request.query_params.get('sugub', ''),
            'id': self.request.query_params.get('jobid', ''),
            'jobadvertise_status': self.request.query_params.get('status', ''),
            # 'sugub__sugub_jikjong_top': self.request.query_params.get('code_id', ''),
            'sugub__sugub_jikjong_top': self.request.query_params.get('sugub_jikjong_top', ''),
            'sugub__sugub_jikjong_mid': self.request.query_params.get('sugub_jikjong_mid', ''),
            'jobadvertise_end_dt__gte': self.request.query_params.get('jobadvertise_end_dt', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class JobQuestionViewSet(viewsets.ModelViewSet):
    queryset = JobQuestion.objects.all()
    serializer_class = JobQuestionSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = JobQuestion.objects.all()
        jobadvertise = self.request.query_params.get('jobadvertise', None)
        if jobadvertise is not None:
            queryset = queryset.filter(jobadvertise=jobadvertise)
        return queryset


class JobAnswerViewSet(viewsets.ModelViewSet):
    queryset = JobAnswer.objects.all()
    serializer_class = JobAnswerSerializer


class JobAdViewSet(viewsets.ModelViewSet):
    queryset = JobAdvertise.objects.all()
    serializer_class = JobAdModelSerializer

    '''
    공고상태 변경 시 수급진행상태 변경
    '''
    # def update(self, request, *args, **kwargs):
    #     print('update?')
    #     return request

    def get_queryset(self, *args, **kwargs):
        queryset = JobAdvertise.objects \
            .select_related('sugub') \
            .select_related('jobadvertise_status', 'job_reward_type', 'job_reward_way') \
            .all()
        # queryset = self.get_serializer_class().setup_eager_loading(queryset)
        filters = {
            'sugub__custid': self.request.query_params.get('custid', ''),
            'sugub': self.request.query_params.get('sugub', ''),
            'id': self.request.query_params.get('jobid', ''),
            'jobadvertise_status': self.request.query_params.get('status', ''),
            'sugub__sugub_jikjong_top': self.request.query_params.get('code_id', ''),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        print( len(connection.queries))

        return queryset.filter(*queries(filters))


#  JobApp 필터
class JobAppFilter(filters.FilterSet):
    sugub_title = filters.CharFilter(field_name='jobadvertise__sugub__sugub_title', lookup_expr='contains')
    chae_cd = filters.ModelChoiceFilter(field_name='jobadvertise__sugub__chae_cd',
                                        queryset=ComCode.objects.filter(Q(code_topidx='AC') & Q(code_topcd=None)))
    company_name = filters.CharFilter(field_name='jobadvertise__company_name', lookup_expr='contains')
    applied_at_min = filters.DateFilter(field_name='applied_at', lookup_expr='gte')
    # applied_at_max = filters.DateFilter(field_name='applied_at', lookup_expr='lte')
    applied_at_max = EndFilter(field_name='applied_at', lookup_expr='lt')
    applied_username = filters.CharFilter(field_name='applied_username', lookup_expr='contains')
    applied_phone = filters.CharFilter(lookup_expr='contains')
    applied_status = filters.ModelMultipleChoiceFilter(
        queryset=ComCode.objects.filter(Q(code_topidx='BW')))


class JobAppReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobApplicant.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = JobAppSerializer
    filter_class = JobAppFilter
    # filterset_fields = ['jobadvertise']

    @action(detail=False, permission_classes=[permissions.IsAuthenticated])
    def hr(self, request, pk=None):
        """
        로그인된 User 의 Hrprofile 에 속한 JobApplicant 를 가져온다.
        """
        ordering = request.GET.get('ordering', '1')
        qs = self.filter_queryset(self.get_queryset())

        if ordering == '1':  # 등록 순
            qs = sorted(qs, key=lambda t: t.applied_at, reverse=True)

        page = self.paginate_queryset(qs)

        if page is not None:
            serializer = JobAppHrSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = JobAppHrSerializer(qs, many=True)
        return Response(serializer.data)

    def get_queryset(self):
        queryset = JobApplicant.objects \
            .select_related('user', 'applied_status', 'hrprofile') \
            .prefetch_related(Prefetch('resume',
                                       queryset=Resume.objects.prefetch_related('except_company', 'careers',
                                                                                'educations', 'languages'))) \
            .prefetch_related(Prefetch('jobadvertise',
                                       queryset=JobAdvertise.objects.select_related('jobadvertise_status',
                                                                                    'job_reward_type',
                                                                                    'job_reward_way')
                                       .prefetch_related('sugub__companyprofile'))
                              ) \
            .all()

        user = self.request.user
        # user = User.objects.get(email='hr1@hr.com')
        if not user.is_anonymous:
            companyprofile, hrprofile = user.check_profile(user)
            if hrprofile is not None:
                queryset = queryset.filter(hrprofile=hrprofile)
            # elif companyprofile is not None:
            #     queryset = queryset.filter(com)
            else:
                queryset = queryset.filter(user=user)
        else:
            queryset = None

        return queryset

# 공고 지원자
class JobAppModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny, ]
    queryset = JobApplicant.objects.all()
    serializer_class = JobAppModelSerializer
    pagination_class = None

    def perform_create(self, serializer):
        user = self.request.data.get('user', None)
        if user is None: # 직접 지원 시
            serializer.save(user=self.request.user)
        else: # HR 회사에서 지원 시
            hr_user = self.request.user
            companyprofile, hrprofile = hr_user.check_profile(hr_user)
            serializer.save(user=User.objects.get(pk=user), hrprofile=hrprofile, hrmanager=hr_user)

    @action(detail=False, permission_classes=[permissions.IsAuthenticated])
    def apply_check(self, request, pk=None):
        list = []

        user = request.user
        companyprofile, hrprofile = user.check_profile(user)

        # for data in request.query_params:
        applied_username = request.query_params['applied_username']
        applied_phone = request.query_params['applied_phone']
        applied_birth = request.query_params['applied_birth']
        is_applied = self.get_queryset().filter(
            hrprofile=hrprofile,
            applied_username=applied_username,
            applied_phone=applied_phone,
            applied_birth=applied_birth,
            applied_status__in=['BW0100000', 'BW0200000', 'BW0301000', 'BW0401000'] # 접수대기, 인사전형진행중, 서류합격, 면접합격
        ).exists()
        list.append({
            'hrprofile': hrprofile.id,
            'applied_username': applied_username,
            'applied_phone': applied_phone,
            'applied_birth': applied_birth,
            'is_applied': is_applied
        })
        print('request.data', list)
        return Response(list)


    # def create(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(data=request.data)
    #     # serialized_data = JobAppSerializer(data=request.data)
    #     if serializer.is_valid():
    #         # JobApplicant.objects.create(**serializer.validated_data)
    #         serializer.save()
    #         # return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
    #         return Response(serializer.validated_data.__dict__, status=status.HTTP_201_CREATED)
    #
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    '''
    
    '''
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        # if serializer.applied_status == 'BW0302000':
        #     print('서류불합격! 문자메시지 전송!')

        return Response(serializer.data)

    def get_queryset(self):
        queryset = JobApplicant.objects \
            .select_related('user', 'resume', 'applied_status') \
            .prefetch_related(Prefetch('jobadvertise',
                                       queryset=JobAdvertise.objects.select_related('jobadvertise_status',
                                                                                    'job_reward_type',
                                                                                    'job_reward_way'))) \
            .all()
        userid = self.request.query_params.get('user', None)
        sugubid = self.request.query_params.get('sugub_id', None)
        jobadvertise_status = self.request.query_params.get('jobadvertise_status', None)
        jobadvertise = self.request.query_params.get('jobadvertise', None)
        hrprofile = self.request.query_params.get('hrprofile', None)

        if userid is not None and userid != 'undefined':
            queryset = queryset.filter(user=userid)
        if sugubid is not None:
            queryset = queryset.filter(jobadvertise__sugub_id=sugubid)
        if jobadvertise_status is not None:
            queryset = queryset.filter(jobadvertise__jobadvertise_status=jobadvertise_status)
        if jobadvertise is not None:
            queryset = queryset.filter(jobadvertise_id=jobadvertise)
        if hrprofile is not None:
            queryset = queryset.filter(hrprofile=hrprofile)

        return queryset


class SugubReviewReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SugubReview.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = SugubReviewSerializer

    def get_queryset(self):
        queryset = SugubReview.objects\
            .select_related('user')\
            .prefetch_related(Prefetch('hrprofile',
                                       queryset=HrProfile.objects
                                       .select_related('status_cd', 'cmp_manager',)
                                       .prefetch_related('service_address')))\
            .prefetch_related(Prefetch('sugubreview_point',
                                       queryset=Point.objects.select_related('point_gubun')))\
            .prefetch_related(Prefetch('sugub',
                                       queryset=Sugub.objects.select_related('chae_cd', 'chae_gigan_type', 'sugub_career_gb',
                                                                             'sugub_jikjong_top', 'sugub_jikjong_mid',
                                                                             'education_cd', 'sugub_gender', 'sugub_status',
                                                                             'cont_chg_gb', 'work_type',
                                                                             )))\
            .all()

        filters = {
            'sugub__sugub_jikjong_mid': self.request.query_params.get('jikjong_mid', None),
            'sugub__sugub_jikjong_top': self.request.query_params.get('jikjong_top', None),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))


class SugubReviewViewSet(viewsets.ModelViewSet):
    queryset = SugubReview.objects.all()
    serializer_class = SugubReviewModelSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = SugubReview.objects\
            .select_related('user')\
            .prefetch_related(Prefetch('hrprofile',
                                       queryset=HrProfile.objects
                                       .select_related('status_cd', 'cmp_manager')
                                       .prefetch_related('service_address')))\
            .prefetch_related(Prefetch('sugubreview_point',
                                       queryset=Point.objects.select_related('point_gubun')))\
            .prefetch_related(Prefetch('sugub',
                                       queryset=Sugub.objects.select_related('chae_cd', 'chae_gigan_type', 'sugub_career_gb',
                                                                             'sugub_jikjong_top', 'sugub_jikjong_mid',
                                                                             'education_cd', 'sugub_gender', 'sugub_status',
                                                                             'cont_chg_gb', 'work_type',
                                                                             )))\
            .all()

        filters = {
            'sugub__sugub_jikjong_mid': self.request.query_params.get('jikjong_mid', None),
            'sugub__sugub_jikjong_top': self.request.query_params.get('jikjong_top', None),
        }

        def queries(filters):
            return [Q(**{k: v}) for k, v in filters.items() if v]

        return queryset.filter(*queries(filters))

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        point_list = request.data.pop('sugubreview_point')
        if serializer.is_valid():
            sugub_review = serializer.save(user=self.request.user)
            for point in point_list:
                obj = Point(
                    sugub_review=sugub_review,
                    point_gubun=ComCode.objects.get(code_id=point['point_gubun']),
                    point=point['point']
                )
                obj.save()
            return Response(serializer.validated_data.__dict__, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationViewSet(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend]


class InterviewModelViewSet(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewModelSerializer
    permission_classes = [permissions.AllowAny, ]
    pagination_class = None


class EstimateModelViewSet(viewsets.ModelViewSet):
    queryset = Estimate.objects.all()
    serializer_class = EstimateModelSerializer
    permission_classes = [permissions.AllowAny, ]
    pagination_class = None

    def get_queryset(self):
        queryset = self.queryset\
            .select_related('user')\
            .prefetch_related('estimate_file')\
            .prefetch_related('hrprofile__user', 'hrprofile__service_address', 'hrprofile__status_cd')\
            .all()

        return queryset
