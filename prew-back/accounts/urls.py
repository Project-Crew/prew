from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.login),
    path('sign-up/',views.sign_up),
    path('delete-user/',views.delete_user),
    path('find-password/',views.find_password)
]
