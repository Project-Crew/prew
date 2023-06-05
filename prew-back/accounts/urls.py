from django.urls import path, include
from . import views
from .views import SignoutView

urlpatterns = [
    # rest_auth
    path('auth/', include('rest_auth.urls')),    
    path('signup/', include('rest_auth.registration.urls')),
    path('signout/', SignoutView.as_view(), name='signout'),

    # kakao social login
    path('kakao/login/', views.kakao_login, name='kakao_login'),
    path('kakao/callback/', views.kakao_callback, name='kakao_callback'),
    path('kakao/login/finish/', views.KakaoLogin.as_view(), name='kakao_login_todjango'),
]
