# -*- coding: utf-8 -*-
# https://www.bilibili.com/video/BV12E411A7ZQ?p=23
import gzip
import urllib.request
import re
from io import BytesIO
from urllib import error
from bs4 import BeautifulSoup
import xlwt
import sqlite3
import json

# 定义正则表达式规则
findImg = re.compile(r'<a href="/product/1427.shtml" target="_blank"><img src="(.*?)"',
                     re.S)  # 创建正则表达式对象,re.S让换行符包含在字符串中
findTitle = re.compile(r'<img.*title="(.*?)"', re.S)
findYadv = re.compile(r'<p class="Yadv">(.*?)</p>', re.S)
findRmb = re.compile(r'<span class="RMB">(.*?)</span>', re.S)

# 全局变量
page = 0
dataList = []  # 存取数据
head = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
    "Accept-Encoding": r"gzip,deflate"
}


# 爬取数据
def CrawlingData():
    try:
        request = urllib.request.Request("https://www.360kad.com/Category_2361/Index.aspx?page=" + str(page),
                                         headers=head)
        response = urllib.request.urlopen(request)
    except error.HTTPError as e:
        print(e.reason, e.code, e.headers, seq='\n')

    html = response.read()
    f = gzip.decompress(html)  # 解压缩
    soup = BeautifulSoup(f, 'html.parser')

    # print(response.status)
    # print(response.getheaders())
    # print(response.getheader('Server'))

    for item in soup.select('#YproductList li'):
        list = []
        img = item.img.get('src')
        item = str(item)
        title = re.findall(findTitle, item)[0]
        yadv = re.findall(findYadv, item)[0]
        rmb = re.findall(findRmb, item)[0]
        # dataList.append({"img": img, "title": title, "Yadv": yadv, "Rmb": rmb})

        list.append(img)
        list.append(title)
        list.append(yadv)
        list.append(rmb)
        dataList.append(list)


# 将数据存入表格xls
def saveData(dataList, savepath):
    print("正在存储数据...")
    workbook = xlwt.Workbook(encoding='utf-8', style_compression=0)
    worksheet = workbook.add_sheet('sheet1', cell_overwrite_ok=True)
    col = ("图片地址", "标题", "详情信息", "价格",)
    for i in range(0, 4):
        worksheet.write(0, i, col[i])
    for i in range(0, len(dataList), ):
        for j in range(0, 4):
            worksheet.write(i + 1, j, dataList[i][j])
    # worksheet.write(0,0,'width')
    workbook.save(savepath)
    print("存储完毕")


# sql操作
def init_db():
    # 创建表
    # id int primary key not null,
    sql = """
    create table movie
        (id INTEGER,
        imgIp text,
        title text,
        yadv text,
        rmb text
        );
    """
    conn = sqlite3.connect('康之家.db')
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    conn.close()

    # 填入信息
    i = 0
    for data in dataList:
        for index in range(0, 4):
            data[index] = '"' + data[index] + '"'
        i += 1
        sql = """
                insert into movie (id,imgIp,title,yadv,rmb)
                 values ({i},{imgIp},{title},{yadv},{rmb});
            """.format(i=i, imgIp=data[0], title=data[1], yadv=data[2], rmb=data[3])
        # print(sql)
        conn = sqlite3.connect('康之家.db')
        cursor = conn.cursor()
        cursor.execute(sql)
        conn.commit()
        conn.close()

    print('数据库操作完成')


if __name__ == '__main__':
    # 遍历存储分页数据
    print('开始爬取数据...')
    for item in range(0, 5):
        page += 1
        CrawlingData()
    print('爬取完毕')

    # 存json
    # filename = "favorite_fruit.json"
    # with open(filename, 'w', encoding='utf-8') as file_obj:
    #     json.dump(dataList, file_obj, ensure_ascii=False)

    # print(dataList)

    # 储存到 表格.xls
    # savePath = '康之家数据'+str(len(dataList))+'条.xls'
    # saveData(dataList,savePath)

    # 储存至数据库sqlite
    # init_db()
