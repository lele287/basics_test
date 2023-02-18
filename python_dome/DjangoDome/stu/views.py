from django.http import HttpResponse
from django.shortcuts import render
from .models import *

# Create your views here.

def login_view(request):

    if request.method=='GET':
        return render(request,'login.html')
    else:
        uname=request.POST.get('uname','')
        pwd=request.POST.get('pwd','')

        if uname and pwd:
            c=Student.objects.filter(sname=uname,spwd=pwd).count()
            if c ==1:
                return HttpResponse('登陆成功！')
        return HttpResponse('登录失败！')


def show_view(request):
    student=Student()
    if request.method=='GET':
        return render(request,'show.html')
    else:
        uname=request.POST.get('uname','')
        pwd=request.POST.get('pwd','')

        if uname and pwd:
            student.sname = uname
            student.spwd = pwd
            student.save()
            return HttpResponse('注册成功！')
        return HttpResponse('注册失败！')