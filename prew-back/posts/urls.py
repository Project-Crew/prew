from django.urls import path
from . import views

urlpatterns = [
    path('', views.posts),
    path('comment/', views.comment),
    path('like/', views.like),
    path('scrap/', views.scrap),
    path('news_API/', views.news_API),
]
