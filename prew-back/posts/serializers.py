from rest_framework import serializers
from .models import Comment, Post

class CommentSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Comment
        fields='__all__'
        read_only_fields = ('post', 'user',)


class PostSerializer(serializers.ModelSerializer):
    post_comment = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields='__all__'
        read_only_fields = ('user', )


    # 댓글 표시할 때 댓글 내용 제한
    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context['request'].user

        # 게시글 작성자 또는 비밀댓글을 작성한 사용자인 경우 댓글 내용 표시
        if instance.user == user or any(comment['is_secret'] and comment['user'] == user for comment in data['post_comment']):
            return data

        # 댓글 내용이 비밀이거나 권한이 없는 경우 댓글 개수만 표시
        data['post_comment'] = '비밀 댓글입니다.'
        return data