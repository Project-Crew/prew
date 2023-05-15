from django.db import models
from django.conf import settings

# Create your models here.
class Post(models.Model):
    category = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    personnel = models.IntegerField()
    now_personnel = models.IntegerField()
    place = models.CharField(max_length=100)
    project_term = models.DateField()
    language = models.CharField(max_length=100)
    skill = models.CharField(max_length=100)
    is_recruiting = models.BooleanField()
    expired_date = models.DateTimeField()
    explain = models.TextField()
    likes = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title