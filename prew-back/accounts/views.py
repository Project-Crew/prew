from django.shortcuts import render, redirect
from django.urls import reverse
from allauth.account.views import PasswordChangeView
from allauth.socialaccount.forms import DisconnectForm

from allauth.socialaccount.models import SocialToken
from rest_framework.authtoken.models import Token
from allauth.account.views import LoginView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.

# test index
def index(request):
    return render(request, 'account/index.html')

def login(request):
    pass

class CustomLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

def sign_up(request):
    pass

def delete_user(request):
    pass

def find_password(request):
    pass

# 비밀번호를 변경하면 index page로 redirect
class CustomPasswordChangeView(PasswordChangeView):
    def get_success_url(self):  
        return reverse("index")


# def socialaccount_connections(request):
#     if request.method == 'POST':
#         form = DisconnectForm(request.POST, initial={'account': account})
#         if form.is_valid():
#             form.save()
#             return redirect('socialaccount_connections')
#     else:
#         form = DisconnectForm(initial={'account': account})


#     return render(request, 'socialaccount_connections.html', {'form': form})
