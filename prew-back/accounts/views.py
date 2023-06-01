from django.shortcuts import render, redirect
from django.conf import settings
from accounts.models import User
from allauth.socialaccount.models import SocialAccount
from django.conf import settings
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.naver import views as naver_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.http import JsonResponse
import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from json.decoder import JSONDecodeError

state = getattr(settings, 'STATE')
BASE_URL = 'http://127.0.0.1:8000/'
KAKAO_CALLBACK_URI = BASE_URL + 'accounts/kakao/callback/'
NAVER_CALLBACK_URI = BASE_URL + 'accounts/naver/callback/'


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
    """
    kakao_account에서 이메일 외에
    카카오톡 프로필 이미지, 배경 이미지 url 가져올 수 있음
    print(kakao_account) 참고
    """
    email = kakao_account.get('email')

    # Signup or Signin Request
    try:
        user = User.objects.get(email=email)
        # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        if social_user is None:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'kakao':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # 기존에 Google로 가입된 유저
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
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
    
class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = KAKAO_CALLBACK_URI


# Naver Login
# DRF의 APIView를 상속받아 View를 구성
class NaverLoginAPIView(APIView):
    # 로그인을 위한 창은 누구든 접속이 가능해야 하기 때문에 permission을 AllowAny로 설정
    permission_classes = (AllowAny,)
    
    def get(self, request, *args, **kwargs):
        # Naver에서 설정했던 callback url을 입력해주어야 한다.
        # Naver Document 에서 확인했던 요청 url
        url = "https://nid.naver.com/oauth2.0/authorize"
        response_type = "code"
        client_id = getattr(settings, 'SOCIAL_AUTH_NAVER_CLIENT_ID')
        # 아래의 전체 값은 http://127.0.0.1:8000/accounts/naver/callback/ 이 된다.
        uri = NAVER_CALLBACK_URI
        state = settings.STATE
        
        # Document에 나와있는 요소들을 담아서 요청한다.
        return redirect(
            f'{url}?response_type={response_type}&client_id={client_id}&redirect_uri={uri}&state={state}'
        )
        
        
class NaverCallbackAPIView(APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request, *args, **kwargs):
        try:
            client_id = getattr(settings, 'SOCIAL_AUTH_NAVER_CLIENT_ID')
            client_secret= getattr(settings, 'SOCIAL_AUTH_NAVER_SECRET')
            code = request.GET.get('code')
            state = request.GET.get('state')

            # Access Token Request
            token_req = requests.get(
                f"https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={code}&state={state}"
            )

            token_req_json = token_req.json()

            error = token_req_json.get("error", None)
            if error is not None:
                raise JSONDecodeError(error)
            access_token = token_req_json.get("access_token")

            # User info get request
            profile_request = requests.get(
                "https://openapi.naver.com/v1/nid/me",
                headers={"Authorization": f"Bearer {access_token}"},
            )

            profile_json = profile_request.json()

            naver_account = profile_json.get('naver_account')

            email = naver_account.get('email')

            # Signup or Signin Request
            try:
                user = User.objects.get(email=email)
                # 기존에 가입된 유저의 Provider가 naver가 아니면 에러 발생, 맞으면 로그인
                # 다른 SNS로 가입된 유저
                social_user = SocialAccount.objects.get(user=user)
                if social_user is None:
                    return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
                if social_user.provider != 'kakao':
                    return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
                # 기존에 Google로 가입된 유저
                data = {'access_token': access_token, 'code': code}
                accept = requests.post(
                    "http://127.0.0.1:8000/accounts/naver/login/finish/", data=data)
                accept_status = accept.status_code
                if accept_status != 200:
                    return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
                accept_json = accept.json()
                accept_json.pop('user', None)
                return JsonResponse(accept_json)
            except User.DoesNotExist:
                # 기존에 가입된 유저가 없으면 새로 가입
                data = {'access_token': access_token, 'code': code}
                accept = requests.post(
                    "http://127.0.0.1:8000/accounts/naver/login/finish/", data=data)
                accept_status = accept.status_code
                if accept_status != 200:
                    return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
                # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
                accept_json = accept.json()
                accept_json.pop('user', None)
                return JsonResponse(accept_json)
                
        except:
            return JsonResponse({
                "error": "error",
            }, status=status.HTTP_404_NOT_FOUND)
            

class NaverToDjangoLoginView(SocialLoginView):
    adapter_class = naver_view.NaverOAuth2Adapter
    client_class = OAuth2Client
    callback_url = NAVER_CALLBACK_URI