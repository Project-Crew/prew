from django.db import models
# from django.contrib.auth.models import User
from django.conf import settings

# # Create your models here.
# class User(models.Model):
#     user_name=models.CharField(max_length=20)
#     email = models.CharField(max_length=255)
#     nickname = models.CharField(max_length=10)
#     profile_img = models.ImageField(upload_to="imgs/")
#     my_comments = models.ManyToManyField(Comment,related_name='comment')
#     my_posts = models.ManyToManyField(Post, related_name='my_post', blank=True)
#     my_scraps = models.ManyToManyField(Post,related_name='post_scrap',blank=True)



# Create your models here.
class Post(models.Model):
    category = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    total_personnel = models.IntegerField()
    now_personnel = models.IntegerField()
    place = models.CharField(max_length=100)
    project_term = models.DateField()
    language = models.CharField(max_length=100)
    skill = models.CharField(max_length=100)
    is_recruiting = models.BooleanField()
    expired_date = models.DateTimeField()
    explain = models.TextField()
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='post_like')
    scraps = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='post_scrap')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content=models.TextField() # 임의
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='comment_like')
    # is_secret = models.OneToOneField()
    