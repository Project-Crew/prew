from django.urls import path, include
from . import views
from rest_framework import routers
from .views import PostViewSet

router = routers.DefaultRouter()
router.register(r'', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    # path('', views.posts),
    path('<int:post_pk>/', views.post_detail),
    path('<int:post_pk>/comments/', views.comment),   # 댓글 쓰기
    # 1. 원래 api 설계
    # path('<int:post_pk>/comments/<int:comment_pk>/', views.comment_detail),
    # 2. 수정 -> post_pk 필요 x
    path('comments/<int:comment_pk>/', views.comment_detail),   # 댓글 조회, 수정, 삭제
    
    path('<int:post_pk>/like/', views.like_post),
    path('<int:post_pk>/scrap/', views.scrap_post),
    path('comments/<int:comment_pk>/like/', views.like_comment),
    path('news_API/', views.news_API),
]
