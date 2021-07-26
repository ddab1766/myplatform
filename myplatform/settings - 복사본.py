import os
from google.oauth2 import service_account

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '$!r)@8^pv#=wd7ksxso22sc#+=jc*e2ssyqihnh64+*lor_+-d'
# SECURITY WARNING: don't run with debug turned on in production!

DEBUG = True
# DEBUG = False

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = (
    # 'suit', # 비번 초기화 Form customizing
    'channels',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',

    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.kakao',
    'allauth.socialaccount.providers.naver',
    'allauth.socialaccount.providers.google',

    'corsheaders',
    #
    'backend',
    'user_profile',
    'company_profile',
    'hr_profile',
    'employee',
    'sms',
    'chat',

    'storages',
    'elastic_search',
    'debug_toolbar',
    'django_filters',
    'rest_framework_filters', #test

    'django_mysql',
    'sendmail',
    'drf_yasg',
)

MIDDLEWARE = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # 'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

ROOT_URLCONF = 'myplatform.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend', 'build'),
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'myplatform.wsgi.application'
ASGI_APPLICATION = "myplatform.asgi.application"

GS_STATIC_BUCKET_NAME = 'chaema'

# Static files (CSS, JavaScript, Images)
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# STATIC_ROOT = 'static'
REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')
STATIC_URL = '/static/'
# STATIC_URL = 'https://storage.googleapis.com/{}/static/'.format(GS_STATIC_BUCKET_NAME)

# whitenoise
DEBUG = False

# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

STATICFILES_DIRS = (
    os.path.join(REACT_APP_DIR, 'build', 'static'),
    # os.path.join(BASE_DIR, 'static'),
)

# Google Cloud Storage
DEFAULT_FILE_STORAGE = 'backend.gcloud.GoogleCloudMediaFileStorage'
# STATICFILES_STORAGE = 'backend.gcloud.GoogleCloudStaticFileStorage'

GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    # "chaema-029f2964eccd.json"
    "chaema-312901-7fd948a2c5fb.json"
    # "chaema-flexible-d8f962cccae1.json"
)

# GS_MEDIA_BUCKET_NAME = 'chaema.appspot.com'
# GS_MEDIA_BUCKET_NAME = 'chaema-flexible.appspot.com'
GS_MEDIA_BUCKET_NAME = 'chaema-312901.appspot.com'

# Google Cloud Storage
MEDIA_URL = 'https://storage.googleapis.com/{}/'.format(GS_MEDIA_BUCKET_NAME)
MEDIA_ROOT = "media/"

UPLOAD_ROOT = 'media/uploads/'

DOWNLOAD_ROOT = os.path.join(BASE_DIR, "media/downloads")
DOWNLOAD_URL = "media/downloads"

# UPLOAD_ROOT = 'uploads/'
#
# DOWNLOAD_URL = "media/downloads"
# DOWNLOAD_ROOT = os.path.join(BASE_DIR, "/media/downloads")



# DataBase
import pymysql  # noqa: 402
pymysql.version_info = (1, 3, 13, "final", 0)
pymysql.install_as_MySQLdb()

# if os.getenv('GAE_APPLICATION', None):
if os.getenv('GAE_INSTANCE', None):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            # 'HOST': '/cloudsql/chaema:asia-northeast3:chaema',
            # 'HOST': '/cloudsql/chaema-flexible:asia-northeast3:chaema',
            'HOST': '/cloudsql/chaema-312901:asia-northeast3:chaema',
            'USER': 'root',
            'PASSWORD': 'coak123$',
            'NAME': 'chaema',
        },
    }
    # DEBUG = True
    DEBUG = False
    URL_FRONT = 'https://chaegong.co.kr/'

    # STATICFILES_STORAGE = 'backend.gcloud.GoogleCloudStaticFileStorage'
    # GS_STATIC_BUCKET_NAME = 'chaema.appspot.com'
    # GS_STATIC_BUCKET_NAME = 'chaema-flexible.appspot.com'
    # GS_STATIC_BUCKET_NAME = 'chaema-312901.appspot.com'
    # GS_STATIC_BUCKET_NAME = 'chaema'
    # STATIC_URL = 'https://storage.googleapis.com/{}/static/'.format(GS_STATIC_BUCKET_NAME)
    # STATIC_ROOT = '/static/'
    # print('static_url')

else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            # 'HOST': '34.64.171.88',
            # 'HOST': '34.64.116.18', # flexible
            'HOST': '34.64.119.42',
            'PORT': '3306',
            'NAME': 'chaema',
            'USER': 'root',
            'PASSWORD': 'coak123$',
            'OPTIONS': {
                'charset': 'utf8mb4',
            },
        },
    }
    URL_FRONT = 'http://localhost:8000/'


LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True
USE_L10N = False
USE_TZ = False
# JQUERY_URL = True

SITE_ID = 2

print('STATIC_URL: ',STATIC_URL)

## User Authentication Settings
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_ADAPTER = 'user_profile.adapter.MyAccountAdapter'
SOCIALACCOUNT_ADAPTER = 'backend.adapter.SocialAccountRegisterAdapter'

# Following is added to enable registration with email instead of username
AUTHENTICATION_BACKENDS = (
 # Needed to login by username in Django admin, regardless of `allauth`
 "django.contrib.auth.backends.ModelBackend",

 # `allauth` specific authentication methods, such as login by e-mail
 "allauth.account.auth_backends.AuthenticationBackend",
)

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'backend.serializers.UserSerializer',
    'PASSWORD_RESET_SERIALIZER': 'backend.serializers.PasswordResetSerializer'
}

REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'backend.serializers.RegisterSerializer',
}

AUTH_USER_MODEL = 'backend.User'

# TOKEN_EXPIRED_AFTER_SECONDS = 60

REST_SESSION_LOGIN = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_VERIFICATION = 'optional'
# ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 14
LOGOUT_ON_PASSWORD_CHANGE = False
# user -> custom user
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_USERNAME_REQUIRED = False

SOCIALACCOUNT_EMAIL_REQUIRED = True
# SOCIALACCOUNT_ADAPTER = 'backend.adapter.KaKaoAccountAdapter'
SOCIALACCOUNT_EMAIL_VERIFICATION = 'none'
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_PROVIDERS = {
    'facebook': {
        'SCOPE': ['email'],
        'METHOD': 'oauth2'
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '1000/day',
        'user': '1000/day'
    },
    # 'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_FILTER_BACKENDS': ['rest_framework_filters.backends.RestFrameworkFilterBackend'],
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticated',
    ),
}

# Change CORS settings as needed
# 확인 必
CORS_ORIGIN_ALLOW_ALL = True
# CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',    #React 도메인
    'http://localhost:8000',    #Django 도메인
    'https://chaema-312901.du.r.appspot.com',    # TEST
)

CORS_ORIGIN_REGEX_WHITELIST = (
    r'^(https://)?storage.googleapis.com/',
    r'^(https://)?chaema-312901.du.r.appspot.com',
    r'^(http?://)?chaegong.co.kr',
    r'^(https?://)?chaegong.co.kr',
    r'^(http?://)?openapi.naver.com',
    r'^(https?://)?openapi.naver.com',
)

# Email Settings
# EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = 'tmp/emails'
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# DEFAULT_FROM_EMAIL = 'admin@admin.com'

# 이메일 설정
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = '587'
# EMAIL_HOST_USER = 'chaeyongmarket@gmail.com'
EMAIL_HOST_USER = 'chaeyongmarket01@gmail.com'
EMAIL_HOST_PASSWORD = 'coak123$'
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Debug_toolbar
INTERNAL_IPS = [
    '127.0.0.1',
]

redis_host = os.environ.get('REDISHOST', '127.0.0.1')
redis_port = int(os.environ.get('REDISPORT', 6379))


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [(redis_host, redis_port)]
            # "hosts": [('116.125.119.111', 6379)]
            # "hosts": [('10.45.39.147', 6379)]
        }
    },
}

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'api_key': {
            'type': 'apiKey',
            'in': 'header',
            'name': 'Authorization'
        }
    },
}