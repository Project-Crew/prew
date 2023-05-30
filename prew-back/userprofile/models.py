from django.db import models
from django.contrib.auth.models import User

class Posts(models.Model):    # posts는 추후에 posts
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)  # 임의
    content=models.TextField()  # 임의
    likes=models.ManyToManyField(User,related_name='post_likes')

class Comment(models.Model):
    conetne=models.TextField() # 임의
    likes=models.ManyToManyField(User,related_name='post_likes')

# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    # user_name=models.CharField(max_length=20)   # User model에서 제공
    # email = models.CharField(max_length=255)   # User model에서 제공
    # nickname = models.CharField(max_length=10)    # User model에서 제공
    profileImg = models.ImageField(upload_to="imgs/")
    my_comments = models.ManyToManyField(Comment,related_name='comment')
    # myPosts = models.ManyToManyField(Posts, related_name='my_post', blank=True)
    # myScraps = models.ManyToManyField(Posts,related_name='post_scrap',blank=True)
    
