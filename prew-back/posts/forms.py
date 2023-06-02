from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ('user', 'now_personnel', 'is_recruiting', 'created_at',)
