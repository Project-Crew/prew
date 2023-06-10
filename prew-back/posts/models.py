from django.db import models
# from django.contrib.auth.models import User
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django_filters import rest_framework as filters


# Create your models here.
class Post(models.Model):
    CATEGORY_CHOICES=(
        ('인원모집','인원모집'),
        ('자유게시판','자유게시판'),
        ('공지사항','공지사항'),
        ('뉴스','뉴스'),
    )
    TOPIC_CHOICES=(
        ('스터디','스터디'),
        ('프로젝트','프로젝트'),
        ('공모전','공모전'),
    )
    PLACES_CHOICES=(
        ('온라인', '온라인'),
        ('오프라인','오프라인')
    )
    category = models.CharField(default='공지사항',max_length=30,choices=CATEGORY_CHOICES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="my_posts")
    title = models.CharField(max_length=100)
    contents = models.TextField(null=True)
    topic = models.CharField(max_length=30,choices=TOPIC_CHOICES, blank=True, null=True)
    total_personnel = models.IntegerField(default=0,validators=[MinValueValidator(0),MaxValueValidator(100)])    # 0 ~ 100까지만 가능
    now_personnel = models.IntegerField(default=0,validators=[MinValueValidator(0),MaxValueValidator(100)])     # 0 ~ 100까지만 가능
    place = models.CharField(default='오프라인',max_length=5,choices=PLACES_CHOICES)
    project_term = models.DateField()
    language = models.JSONField(default=dict)
    skill = models.JSONField(default=dict)
    is_recruiting = models.BooleanField(default=True)    # True: 모집중, False: 모집완료
    expired_date = models.DateField()
    explain = models.TextField()
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='post_like', blank=True)
    scraps = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='post_scrap', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class PostFilter(filters.FilterSet):
    class Meta:
        model = Post
        fields = {
            'category': ['exact'],
            'topic': ['exact'],
            'place': ['exact'],
            'project_term': ['lte', 'gte'],
            # 'language': ['contains'],
            # 'skill': ['contains'],
            'is_recruiting': ['exact'],
        }


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="my_comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comment')
    content=models.TextField() # 임의
    likes=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='comment_like', blank=True)
    is_secret = models.BooleanField(default=False)    # True: 비밀댓글, False: 공개 댓글
    
