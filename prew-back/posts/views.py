from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404, get_list_or_404
from django.db.models import Q

from accounts.models import User

from .models import Post, PostFilter, Comment
from .serializers import PostSerializer, CommentSerializer

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user= User.objects.get(pk=1)    #임시
            serializer.save(user=user)    #임시
            # serializer.save(user=request.user)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE', 'PUT'])
def post_detail(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        user= User.objects.get(pk=1)    # 임시
        if post.user == user:   # 임시
        # if post.user == request.user:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        user= User.objects.get(pk=1)    # 임시
        if post.user == user:   # 임시
        # if post.user == request.user:
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def comment(request, post_pk):    # 비밀댓글 포함 -> serializers에서 처리
    post = get_object_or_404(Post, pk=post_pk)
    user= User.objects.get(pk=1)    #임시

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        # serializer.save(user=request.user, post=post)
        serializer.save(user=user, post=post)   # 임시
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
def comment_detail(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    user= User.objects.get(pk=1)    #임시

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        # if comment.user == request.user:
        if comment.user == user:    #임시
            serializer = CommentSerializer(comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
    
    elif request.method == 'DELETE':
        # if comment.user == request.user:
        if comment.user == user:    #임시
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def like_post(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
    # user = request.user
    user= User.objects.get(pk=1)    #임시

    if post.likes.filter(pk=user.pk).exists():
        post.likes.remove(user)
        return Response(status=status.HTTP_200_OK)
    post.likes.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def scrap_post(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)
    # user = request.user
    user= User.objects.get(pk=1)    #임시

    if post.scraps.filter(pk=user.pk).exists():
        post.scraps.remove(user)
        return Response(status=status.HTTP_200_OK)
    post.scraps.add(user)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def like_comment(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    # user = request.user
    user= User.objects.get(pk=1)    #임시
    
    if comment.likes.filter(pk=user.pk).exists():
        comment.likes.remove(user)
        return Response(status=status.HTTP_200_OK)
    comment.likes.add(user)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def search_post(request):
    
    if request.method == 'GET':
        keyword = request.GET.get('keyword','')
        queryset = Post.objects.filter(Q(title__icontains=keyword)|Q(contents__icontains=keyword))
        serializer = PostSerializer(queryset, many = True)
        return Response(serializer.data)

def news_API(request):
    pass

