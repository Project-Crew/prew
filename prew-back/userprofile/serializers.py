from posts.serializers import CommentSerializer, PostSerializer
from rest_framework import serializers
from accounts.models import User


class ProfileSerializer(serializers.ModelSerializer):
    # my_comments = serializers.SerializerMethodField()
    # my_posts = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    my_comments = CommentSerializer(many=True,read_only=True)
    my_posts = PostSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    scraps = serializers.SerializerMethodField(read_only=True)


    def get_full_name(self,obj):
        return f"{obj.last_name} {obj.first_name}"
    
    def get_likes(self, obj):
        return obj.post_like.values_list('pk',flat=True)
    
    def get_scraps(self, obj):
        return obj.post_scrap.values_list('pk',flat=True)
    
    class Meta:
        model = User
        fields = ['username', 'full_name','email', 'nickname', 'profileImg','my_comments','my_posts','likes','scraps','created_at','updated_at' ]