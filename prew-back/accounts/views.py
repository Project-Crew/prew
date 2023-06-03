from django.shortcuts import render, redirect
from django.conf import settings
from accounts.models import User
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.http import JsonResponse
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from json.decoder import JSONDecodeError
from rest_auth.views import LogoutView
from rest_framework.generics import DestroyAPIView

# 회원 탈퇴
class SignoutView(LogoutView, DestroyAPIView):
    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"detail": "회원탈퇴가 완료되었습니다."}, status=status.HTTP_200_OK)



state = getattr(settings, 'STATE')
BASE_URL = 'http://127.0.0.1:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'accounts/kakao/callback/'


# Kakao Login
def kakao_login(request):
    rest_api_key = getattr(settings, 'KAKAO_REST_API_KEY')
    return redirect(
        f"https://kauth.kakao.com/oauth/authorize?client_id={rest_api_key}&redirect_uri={KAKAO_CALLBACK_URI}&response_type=code"
    )

def kakao_callback(request):
    rest_api_key = getattr(settings, 'KAKAO_REST_API_KEY')
    code = request.GET.get("code")
    redirect_uri = KAKAO_CALLBACK_URI

    # Access Token Request
    token_req = requests.get(
        f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={rest_api_key}&redirect_uri={redirect_uri}&code={code}")
    
    token_req_json = token_req.json()

    error = token_req_json.get("error")
    if error is not None:
        raise JSONDecodeError(error)
    access_token = token_req_json.get("access_token")
    
    # Email Request
    profile_request = requests.get(
        "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    
    profile_json = profile_request.json()

    kakao_account = profile_json.get('kakao_account')

    email = kakao_account.get('email')

    # Signup or Signin Request
    try:
        user = User.objects.get(email=email)

        social_user = SocialAccount.objects.get(user=user)

        if social_user is None:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'kakao':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)

        data = {'access_token': access_token, 'code': code}

        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        
        accept_json = accept.json()

        accept_json.pop('user', None)

        return JsonResponse(accept_json)
    
    except User.DoesNotExist:
        data = {'access_token': access_token, 'code': code}

        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        
        accept_status = accept.status_code

        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        
        accept_json = accept.json()

        accept_json.pop('user', None)
        
        return JsonResponse(accept_json)
    
class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = KAKAO_CALLBACK_URI