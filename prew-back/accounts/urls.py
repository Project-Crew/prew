from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='account_login'),
    path('sign-up/', views.sign_up, name='account_signup'),
    path('find-password/', views.find_password, name='account_reset_password'),
    path('unregister/', views.delete_user, name='unregister'),
]
