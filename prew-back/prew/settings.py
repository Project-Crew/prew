from pathlib import Path
import os
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-^uw=6=(!d*)tnk9ex!mxuf84rsl^d3)yq))x8f6=$#uz_)@(8e'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        # 다른 인증 클래스들...
    ],
    # 기타 설정들...
}
# Application definition

INSTALLED_APPS = [
    'rest_framework',
    'userprofile',
    'posts',
    'accounts',
    'django.contrib.admin',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    
    # account 관련
    'django.contrib.auth',
    'django.contrib.messages',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.facebook',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.kakao',
    'allauth.socialaccount.providers.naver',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'prew.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'), os.path.join(BASE_DIR, 'templates', 'accounts')],
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

WSGI_APPLICATION = 'prew.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ---------------------- allauth 관련 settings.py 수정 사항 ---------------------------
AUTHENTICATION_BACKENDS = [
    # django에서 제공하는 기본 backends 모델 => 기본 회원가입/로그인을 위함
    'django.contrib.auth.backends.ModelBackend',
    # allauth가 사용하는 backends 모델 => SNS 회원가입/로그인을 위함
    'allauth.account.auth_backends.AuthenticationBackend',
]

SITE_ID = 1

# allauth에서 사용할 model을 정의해줌
AUTH_USER_MODEL = "accounts.User"

# console로 해두면 이메일이 콘솔창에 출력됨
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# SOCIALACCOUNT_PROVIDERS = {
    # Facebook
        # 'APP': {
        #     'client_id': '123',
        #     'secret': '456',
        #     'key': ''
        # }
        
    # Google

    # Kakao

    # Naver
# }
    
# 회원가입 or 로그인 하고 나서 redirect할 페이지 설정 => 홈 화면 url이 어디인지?
ACCOUNT_SIGNUP_REDIRECT_URL = 'index'
LOGIN_REDIRECT_URL = 'index'

# 로그아웃 페이지 새로 안만들고 로그아웃 누르자 마자 바로 로그아웃 하게끔
ACCOUNT_LOGOUT_ON_GET = True

# 로그인 방식 : email
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True # email을 필수항목으로 만들기
ACCOUNT_USERNAME_REQUIRED = False # username을 필수항목에서 제거

# 아이디 기억하기 기능 구현하고 싶으면
# ACCOUNT_SESSION_REMEMBER = True
# SESSION_COOKIE_AGE = 3600

# SignupForm 사용 설정
# ACCOUNT_SIGNUP_FORM_CLASS = "accounts.forms.SignupForm"

# 비밀번호 유효성 검사 클래스 사용
# AUTH_PASSWORD_VALIDATORS = [
#     { "NAME" : "accounts.validators.CustomPasswordValidator"}
# ]

# True이면 회원가입 폼이 유효하지 않아도 폼에 작성했던 내용을 모두 지우지 않고 비밀번호를 유지시켜줌.
ACCOUNT_PASSWORD_INPUT_RENDER_VALUE = True


# 이메일 인증을 성공해야 로그인 할 수 있음. "optional"은 인증 안해도 로그인 됨.
ACCOUNT_EMAIL_VARIFICATION = "mandatory"

# 이메일로 전송된 링크를 누르면 바로 회원가입이 완료됨.
ACCOUNT_CONFIRM_EMAIL_ON_GET = True

# 이메일 인증 완료했을 때 해당 name의 url로 redirect
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = "account_email_confirmation"
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = "account_email_confirmation"

# SNS로 가입한 계정 삭제(라기 보단 연동 해제)
SOCIALACCOUNT_FORMS = {'disconnect': 'accounts.forms.MyCustomSocialDisconnectForm'}
# -------------------------------------------------

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
