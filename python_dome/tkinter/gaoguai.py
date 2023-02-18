# coding=utf-8
import itertools
# from threading import Thread
from concurrent.futures import ThreadPoolExecutor

import grequests as grequests
import requests
import time

# url = "http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/app/players?page=1&limit=100&stage_code=MnWkdM9jDw"


myData = {
    "page": 1,
    "limit": 8,
    "stage_code": 'MnWkdM9jDw'
}
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
    "Accept-Encoding": r"gzip,deflate"
}
req_list =[
    grequests.get('http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/app/initial?stage_code=MnWkdM9jDw', headers=head),
    grequests.get('http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/app/stages/show?stage_code=MnWkdM9jDw', headers=head),
    grequests.get('http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/oss/sign?stage_code=MnWkdM9jDw', headers=head),
    grequests.get('http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/app/stages/gift?stage_code=MnWkdM9jDw', headers=head),
    grequests.get('http://x5.62744150565474494e5a.aaa.toupiao.lezuwan.com/api/v1/app/players?page=1&limit=20&stage_code=MnWkdM9jDw', headers=head),
]
res = []
def pohuai():
    # for i in itertools.repeat(1):
    # requests.get(url, headers=head)
    # res = requests.get(req_list, headers=head)
    res = grequests.map(req_list)
    print(res)
    if res[0].status_code!=200:
        time.sleep(5)

if __name__ == '__main__':
    # num=int(input('请输入进程数'))
    # with ThreadPoolExecutor(num) as t:
    #     for i in range(10000):
    #         t.submit(pohuai)
    for i in itertools.repeat(1):
        pohuai()