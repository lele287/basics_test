#coding=utf-8
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from stu.models import Student

def index_view(request):
    print(request.GET)
    response = {}
    try:
        result = Student.objects.all()
        arr = []
        for i in result:
            content = {'name': i.sname, 'pwd': i.spwd}
            arr.append(content)
        # print(arr)
        # response['list'] = json.loads(serializers.serialize("json", result))
        response['list'] = arr
        response['request'] = request.GET
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

