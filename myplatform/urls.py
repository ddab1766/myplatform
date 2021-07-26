from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from django.urls import path, re_path
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from rest_framework import routers
from rest_auth.registration.views import SocialAccountListView
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from drf_yasg import openapi
from rest_auth.views import PasswordResetView

from backend.views import (
      UserListView, UserViewSet, KakaoLogin, FacebookLogin, NaverLogin, NaverLoginCallback, \
      SignUpCheckView, JikjongViewSet, QuestionViewSet, GoogleLogin, QnaViewSet, FAQListView, ComCodeViewSet,
      CustomUserDetailsView, TempRegister, AlarmReadOnlyModelView, AlarmModelViewSet, InvitationsModelViewSet
)
from company_profile.views import SugubModelViewSet, SugubModelViewSet, JobAdViewSet, JobAppModelViewSet, CompanyProfileViewSet, SugubReviewViewSet, \
      SugubReadOnlyViewSet, CompanyProfileCoWorkerViewSet, CompanyProfileReadOnlyViewSet, JobQuestionViewSet, JobAnswerViewSet, JobAdListViewSet, JobAdReadOnlyModelViewSet
from user_profile.views import (
      UserProfileViewSet, UserSpecialViewSet, ResumeViewSet, CareerViewSet, \
      EducationViewSet, NaverShortUrl, UserAdvKeyViewSet, CompanyAdvKeyViewSet, InterestAdvViewSet, UserSpecialListView, ResumeListView, UserProfileListView, \
      ImportPaymentHistoryViewSet, LanguageViewSet, UserCommentViewSet, UserSpecialReadOnlyModelViewSet
)
from hr_profile.views import HrProfileViewSet, HrProfileReadOnlyModelViewSet, HrSugubReadOnlyModelViewSet, HrSpecialReadOnlyViewSet, HrSpecialModelViewSet

from company_profile.views import (
      JobAppReadOnlyModelViewSet, SugubReviewReadOnlyViewSet, NotificationViewSet, InterviewModelViewSet
)
from chat.views import (ChatReadOnlyModelView)


router = routers.DefaultRouter()
router.register(r'user', UserViewSet, )

router.register(r'common', ComCodeViewSet, )
# router.register(r'jobQuestion', JobQuestionViewSet, )
# router.register(r'jobAnswer', JobAnswerViewSet, )
router.register(r'resume', ResumeViewSet, )
# router.register(r'career', CareerViewSet, )
# router.register(r'education', EducationViewSet, )
# router.register(r'language', LanguageViewSet, )
# router.register(r'question', QuestionViewSet, )
router.register(r'jikjong', JikjongViewSet, )
# router.register(r'interestadv', InterestAdvViewSet, )
router.register(r'payments', ImportPaymentHistoryViewSet, )
router.register(r'qna', QnaViewSet, )

# router.register(r'interview', InterviewModelViewSet, )
router.register(r'alarm', AlarmModelViewSet, )

# v_router = CustomReadOnlyRouter()
v_router = routers.DefaultRouter()
v_router.register(r'hrprofile', HrProfileReadOnlyModelViewSet)
# v_router.register(r'hrsugub', HrSugubReadOnlyModelViewSet)
v_router.register(r'sugub', SugubReadOnlyViewSet)
v_router.register(r'companyprofile', CompanyProfileReadOnlyViewSet)
v_router.register(r'hrspecial', HrSpecialReadOnlyViewSet)
v_router.register(r'jobApp', JobAppReadOnlyModelViewSet)
v_router.register(r'jobAd', JobAdReadOnlyModelViewSet)
v_router.register(r'userspecial', UserSpecialReadOnlyModelViewSet)
v_router.register(r'sugubreview', SugubReviewReadOnlyViewSet)
v_router.register(r'alarm', AlarmReadOnlyModelView)
v_router.register(r'chat', ChatReadOnlyModelView)


app_name = 'myplatform'

schema_url_v1_patterns = [
      url(r'^api/backend/', include('backend.urls')),
      url(r'^api/employee/', include('employee.urls')),
      url(r'^api/companyprofile/', include('company_profile.urls')),
      url(r'^api/userprofile/', include('user_profile.urls')),
      url(r'^api/hrprofile/', include('hr_profile.urls')),
]

schema_view_v1 = get_schema_view(
      openapi.Info(
            title="API",
            default_version='v1',
            description="API 문서 페이지 입니다.",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="sven0906@gmail.com"),
            license=openapi.License(name=".."),
      ),
      validators=['flex'],  # 'ssv'],
      public=True,
      permission_classes=(AllowAny,),
      patterns=schema_url_v1_patterns,
)

urlpatterns = []

if settings.DEBUG:
      import debug_toolbar
      urlpatterns = [
            path('__debug__/', include(debug_toolbar.urls)),
            url(r'^swagger(?P<format>\.json|\.yaml)/v1$', schema_view_v1.without_ui(cache_timeout=0),
                name='schema-json'),
            url(r'^swagger/v1/$', schema_view_v1.with_ui('swagger', cache_timeout=0),
                name='schema-swagger-ui'),
            url(r'^redoc/v1/$', schema_view_v1.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
      ]


urlpatterns += urlpatterns + [
      # url(r'^', include('rest_invitations.urls')),
      url(r'^', include('django.contrib.auth.urls')),
      url(r'^invitations/', include('invitations.urls', namespace='invitations')),
      path('admin/', admin.site.urls),
      path('rest-auth/user/', CustomUserDetailsView.as_view()),
      path('rest-auth/', include('rest_auth.urls')),
      path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
      path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
      path('rest-auth/kakao/', KakaoLogin.as_view(), name='kakao_login'),
      path('rest-auth/naver/', NaverLogin.as_view(), name='naver_login'),
      path('rest-auth/socialaccounts/', SocialAccountListView.as_view(), name='social_account_list'),
      path('rest-auth/registration/exists/', SignUpCheckView, name='email_exists'),
      path('rest-auth/registration/', include('rest_auth.registration.urls')),
      path('accounts/', include('allauth.urls')),
      path('v1/user/', UserListView.as_view()),
      path('v1/userprofile/', UserProfileListView.as_view()),
      path('v1/resume/', ResumeListView.as_view()),  # 수정 中
      path('v1/noti/', NotificationViewSet.as_view()),
      path('v1/FAQ/', FAQListView.as_view()),
      path('v1/', include(v_router.urls)),
      path('api/backend/', include('backend.urls')),
      path('api/employee/', include('employee.urls')),
      path('api/companyprofile/', include('company_profile.urls')),
      path('api/userprofile/', include('user_profile.urls')),
      path('api/hrprofile/', include('hr_profile.urls')),
      path('api/', include(router.urls)),
      path('naverapi/shorturl/', NaverShortUrl),
      path('sms/', include('sms.urls')),
      path('es/', include('elastic_search.urls')),
      path('tempRegister/', TempRegister.as_view()),
      url(r'^', TemplateView.as_view(template_name='index.html'), name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
