# from django.db import models
# from django.conf import settings
# from posts.models import Comment, Posts

# # Create your models here.
# class Profile(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user_profile")
#     my_comments = models.ManyToManyField(Comment,related_name='comment')
#     my_posts = models.ManyToManyField(Posts, related_name='my_post', blank=True)
#     my_scraps = models.ManyToManyField(Posts,related_name='post_scrap',blank=True)