from django.urls import path, include
from . import views

urlpatterns = [
    # index test page
    # path('', views.index, name='index'),

    # path('login/', MyLoginView.as_view(), name='login'),
    # path('login/', CustomLoginView.as_view(), name='account_login'),
    # path('logout/', views.login, name='account_logout'),
    # path('signup/', views.sign_up, name='account_signup'),

    # 비밀번호 관련
    # # 비밀번호 찾기 페이지 (비밀번호 재설정 링크를 받을 이메일을 입력하는 페이지)
    # path('password/reset/', views.find_password, name='account_reset_password'),
    # # 비밀번호 재설정 이메일 전송 완료 페이지
    # path('password/reset/done/', views.find_password, name='account_reset_password_done'),
    # # 비밀번호 재설정 페이지
    # path('password/reset/key/', views.find_password, name='account_reset_password_from_key'),
    # # 비밀번호 재설정 완료 페이지
    # path('password/reset/key/done/', views.find_password, name='account_reset_password_from_key_done'),

    # path('unregister/', views.delete_user, name='unregister'),
    # path('email-confirmation-done/', TemplateView.as_view(template_name="accounts/email_confirmation.html"), name='account_email_confirmation'),

    # rest_auth
    # path('api/login/', CustomLoginView.as_view(), name='rest_login'),
    # path('auth/', include('rest_auth.urls')),    
    # path('signup/', include('rest_auth.registration.urls'))

    path('kakao/login/', views.kakao_login, name='kakao_login'),
    path('kakao/callback/', views.kakao_callback, name='kakao_callback'),
    path('kakao/login/finish/', views.KakaoLogin.as_view(), name='kakao_login_todjango'),

    path('naver/login/', views.NaverLoginAPIView.as_view(), name='naver_login'),
    path('naver/callback/', views.NaverCallbackAPIView.as_view(), name='naver_callback'),
    path('naver/login/finish/', views.NaverToDjangoLoginView.as_view(), name='naver_login_todjango'),
]
