from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('login/', views.login, name='account_login'),
    path('sign-up/', views.sign_up, name='account_signup'),
    path('find-password/', views.find_password, name='account_reset_password'),
    path('unregister/', views.delete_user, name='unregister'),
    path('email-confirmation-done/', TemplateView.as_view(template_name="accounts/email_confirmation.html"), name='account_email_confirmation'),
]
