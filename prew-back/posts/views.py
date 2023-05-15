from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from .forms import PostForm

# Create your views here.
def posts(request):
    if request.method == 'GET':
        posts = Post.object.all()
        context = {
            'posts': posts
        }
        return render(request, '', context)
    
    elif request.method == 'POST':
        if request.user.is_authenticated:
            form = PostForm(request.POST)
            if form.is_valid():
                post = form.save()
                return redirect('post_detail', post_pk = post.pk)
        return redirect('accounts:login')


def post_detail(request, post_pk):
    post = get_object_or_404(Post, pk=post_pk)

    if request.method == 'POST':
        if request.user.is_authenticated and request.user == post.user:
            form = PostForm(request.POST, instance=post)
            if form.is_valid():
                form.save()
                return redirect('post_detail', post_pk=post.pk)
    
    else:
        form = PostForm(instance=post)
    
    context = {
        'post': post,
        'form': form,
    }
    return render(request, '', context)


def comment(request):    # 비밀댓글 포함
    pass

def like(request):
    pass

def scrap(request):
    pass

def news_API(request):
    pass