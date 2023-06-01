from django.urls import path
from . import views

urlpatterns = [
    path('',views.profile),
    path('check-password/',views.check_password),
    path('change-info/',views.change_info),
]
