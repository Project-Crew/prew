from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Comment,Profile, Posts

class CommentSerializer(serializers.ModelSerializer):  #임의
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model=Posts
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'likes', 'comments']




class ProfileSerializer(serializers.ModelSerializer):
    my_comments = serializers.SerializerMethodField()
    my_posts = serializers.SerializerMethodField()


    class Meta:
        model = Profile
        fields = ['email','userName','nickName','profileImg','myComments','myPosts','myScraps','likes','created_at', 'updated_at']

    def get_my_comments(self, obj):
        comments = Comment.objects.filter(profile=obj)
        serializer = CommentSerializer(comments, many=True)
        return serializer.data

    def get_my_posts(self, obj):
        posts = Posts.objects.filter(userName=obj.user)
        serializer = PostSerializer(posts, many=True)
        return serializer.data

