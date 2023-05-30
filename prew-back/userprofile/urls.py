from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_pk>/',views.profile),
    path('check-password/',views.check_password),
    path('change-info/',views.change_info),
]
