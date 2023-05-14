from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import ProfileSerializer
# Create your views here.
@api_view(['GET'])
def profile(request):
    if request.method=="GET":
        serializer = ProfileSerializer
        

def check_password(request):
    pass

def change_info(request):  # 사용자 닉네임, 비밀번호 등 수정
    pass