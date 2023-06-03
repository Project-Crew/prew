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
def naver_login(request):
    rest_api_key = getattr(settings, 'SOCIAL_AUTH_NAVER_CLIENT_ID')
    return redirect(
        f"https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={rest_api_key}&redirect_uri={NAVER_CALLBACK_URI}&state={settings.STATE}"
    )

def naver_callback(request):
    rest_api_key = getattr(settings, 'SOCIAL_AUTH_NAVER_CLIENT_ID')
    rest_api_secret = getattr(settings, 'SOCIAL_AUTH_NAVER_SECRET')
    redirect_uri = NAVER_CALLBACK_URI
    code = request.GET.get('code')
    state = request.GET.get('state')

    # token request - redirect uri 필요한가 해서 넣어봤음 원랜 안넣었음
    token_req = requests.get(
        f"https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={rest_api_key}&client_secret={rest_api_secret}&code={code}&state={state}"
    )
    print('---------token_req---------')
    print(token_req)

    token_req_json = token_req.json()
    print('---------token_req_json---------')
    print(token_req_json)

    error = token_req_json.get("error")
    if error is not None:
        raise JSONDecodeError(error)
    access_token = token_req_json.get("access_token")
    print('----------access_token---------')
    print(access_token)

    profile_request = requests.get(
        "https://openapi.naver.com/v1/nid/me", headers={"Authorization": f"Bearer {access_token}"})

    profile_json = profile_request.json()
    print('-------profile_json----------')
    print(profile_json)

    naver_account = profile_json.get('response')
    print('-----------naver_account---------')
    print(naver_account)

    email = naver_account.get('email')
    print('------------email-------------')
    print(email)

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
        print('---------data--------')
        print(data)
        accept = requests.post(
            f"{BASE_URL}accounts/naver/login/finish/", data=data)
        print('----------accept----------')
        print(accept)
        accept_status = accept.status_code
        print('----------accept_status--------')
        print(accept_status)
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
    except User.DoesNotExist:
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/naver/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)





# class NaverCallbackAPIView(APIView):
#     permission_classes = (AllowAny,)
    
#     def get(self, request, *args, **kwargs):
#         try:
#             # Naver Login Parameters
#             client_id = getattr(settings, 'SOCIAL_AUTH_NAVER_CLIENT_ID')
#             client_secret = getattr(settings, 'SOCIAL_AUTH_NAVER_SECRET')


#             # token request
#             token_request = requests.get(
#                 f"https://nid.naver.com/oauth2.0/token?{parameters}"
#             )

#             token_response_json = token_request.json()
#             error = token_response_json.get("error", None)

#             if error is not None:
#                 raise JSONDecodeError(error)

#             access_token = token_response_json.get("access_token")

#             # User info get request
            
#             print('--------------------------------')
#             print(token_response_json)
#             print('--------------------------------')
#             print(access_token)
#             print('--------------------------------')
#             print(user_info_request)
#             print('--------------------------------')
#             # User 정보를 가지고 오는 요청이 잘못된 경우
#             if user_info_request.status_code != 200:
#                 return JsonResponse({"error": "failed to get email."}, status=status.HTTP_400_BAD_REQUEST)

#             user_info = user_info_request.json().get("response")
#             email = user_info["email"]

#             # User 의 email 을 받아오지 못한 경우
#             if email is None:
#                 return JsonResponse({
#                     "error": "Can't Get Email Information from Naver"
#                 }, status=status.HTTP_400_BAD_REQUEST)

#             try:
#                 user = User.objects.get(email=email)
#                 print(user_info_request)
#                 data = {'access_token': access_token, 'code': code}
#                 print('--------------------------------')
#                 print(data)
#                 # accept 에는 token 값이 json 형태로 들어온다({"key"}:"token value")
#                 # 여기서 오는 key 값은 authtoken_token에 저장된다.
#                 accept = requests.post(
#                     f"{main_domain}/user/naver/login/success/", data=data
#                 )
#                 print('--------------------------------')
#                 print(accept)
#                 print('--------------------------------')
#                 print(accept.status_code)
#                 # 만약 token 요청이 제대로 이루어지지 않으면 오류처리
#                 if accept.status_code != 200:
#                     return JsonResponse({"error": "Failed to Signin."}, status=accept.status_code)
#                 return Response(accept.json(), status=status.HTTP_200_OK)

#             except User.DoesNotExist:
#                 data = {'access_token': access_token, 'code': code}
#                 accept = requests.post(
#                     f"{main_domain}/accounts/naver/login/success/", data=data
#                 )
#                 # token 발급
#                 return Response(accept.json(), status=status.HTTP_200_OK)
                
#         except:
#             return JsonResponse({
#                 "error": "error",
#             }, status=status.HTTP_404_NOT_FOUND)
            
class NaverToDjangoLoginView(SocialLoginView):
    adapter_class = naver_view.NaverOAuth2Adapter
    client_class = OAuth2Client