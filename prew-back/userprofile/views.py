from django.shortcuts import get_object_or_404,get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import User
from userprofile.serializers import ProfileSerializer
# from .serializers import ProfileSerializer
# Create your views here.
@api_view(['GET'])
def profile(request,user_pk):
    user = get_object_or_404(User, pk=user_pk)
    if request.method=="GET":
        serializer = ProfileSerializer(user)
        return Response(serializer.data)
    
        # serializer = ProfileSerializer
        

def check_password(request):
    pass

def change_info(request):  # 사용자 닉네임, 비밀번호 등 수정
    pass