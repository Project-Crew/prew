from django import forms
from django.contrib.auth.forms import UserChangeForm, UserCreationForm 
from .models import User 

class CustomUserCreationForm(UserCreationForm):    
    class Meta:        
        model = User        
        fields = ('email', )  
class CustomUserChangeForm(UserChangeForm):    
    class Meta:        
        model = User        
        fields = UserChangeForm.Meta.fields


# class SignupForm(forms.ModelForm):    
#     username = forms.CharField(label=('username'), max_length=30, widget=forms.TextInput(attrs={'placeholder': ('username'), }))
    
#     class Meta:
#         model = User
#         fields = ('username',)


#     def signup(self, request, user):
#         user.username = self.cleaned_data['username']
#         user.save()

# from allauth.socialaccount.forms import DisconnectForm

# class MyCustomSocialDisconnectForm(DisconnectForm):
#     def save(self):
#         # Do any custom processing here if you need access to the social account being deleted
#         super(MyCustomSocialDisconnectForm, self).save()
#         # Do any custom processing here if you don't need access to the social account being deleted