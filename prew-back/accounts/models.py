from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # user_name=models.CharField(max_length=20)
    # email = models.CharField(max_length=255)
    nickname = models.CharField(max_length=10)
    profile_img = models.ImageField(upload_to="imgs/")
    # my_comments = models.ManyToManyField(Comment,related_name='comment')
    # my_posts = models.ManyToManyField(Post, related_name='my_post', blank=True)
    # my_scraps = models.ManyToManyField(Post,related_name='post_scrap',blank=True)
