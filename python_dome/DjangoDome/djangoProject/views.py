# coding=utf-8
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
import os


def file_name(file_dir):
    fileList = []
    for root, dirs, files in os.walk(file_dir,followlinks=False):
        for file in files:
            fileList.append(os.path.join(root.replace(file_dir,""), file))
    data = {}
    data["fileList"] = fileList
    return data


def img_view(request):
    response = {}
    try:
        response = file_name("../图片")
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)


def file_view(request):
    response = {}
    try:
        response = file_name("../文档")
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)