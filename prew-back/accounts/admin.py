from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User

class CustomUserAdmin(UserAdmin):    
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email']

admin.site.register(User, CustomUserAdmin)
# UserAdmin.fieldsets += (("Custom fields", {"fields": ("nickname",)}),)

