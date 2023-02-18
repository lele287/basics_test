import sys
import you_get
import os
import asyncio
import aiohttp

# 下载开始位置
page = int(input("请输入下载开始位置:"))
# page = 72
# 下载结束位置
pageEnd = int(input("请输入下载结束位置:"))
# pageEnd = 99

def download(url, path):
    # -o指定下载路径  -O指定下载名称
    # sys.argv = ['you-get', '-o', path, '-O', page, url]
    sys.argv = ['you-get', '-o', path, url]
    you_get.main()

# 更改文件名称
def changeName(path):
    # 获取该目录下所有文件，存入列表中
    fileList = os.listdir(path)
    n = 0
    for i in fileList:
        # 设置旧文件名（就是路径+文件名）
        oldname = path + os.sep + fileList[n]  # os.sep添加系统分隔符

        # 设置新文件名
        # newname = path + os.sep + fileList[n].replace('2021年最新Python爬虫教程-实战项目案例（最新录制） (','')
        try:
            # 设置新文件名
            newname = path + os.sep + fileList[n].split('(')[1].rsplit(')')[0] + '.flv'

            os.rename(oldname, newname)  # 用os模块中的rename方法对文件改名
            print(oldname, '======>', newname)
        except:
            pass

        n += 1

# 删除XML配置文件     .download文件
def deleteXmlFile(path):
    for root, dirs, files in os.walk(path):
        for name in files:
            if name.endswith(".xml"):
                os.remove(os.path.join(root, name))
                print("Delete File: " + os.path.join(root, name))

# async def main():
#     task=asyncio.create_task(download())

if __name__ == '__main__':

    for item in range(page-1,pageEnd):
        # 视频网站的地址
        # url = input("请输入视频网站的地址并手动拼接分页，比如(https://www.bilibili.com/video?p='+str(page)):")
        # url = 'https://www.bilibili.com/video/BV1i54y1h75W?p='+str(page)
        url = "https://www.bilibili.com/video/BV18J411W7cE?p="+str(page)+"&spm_id_from=pageDriver"
        # 视频输出的位置
        # path = input("请输入视频输出的位置,比如 (D:\视频下载):")
        path = r'D:\视频下载\JAVA'
        download(url, path)
        deleteXmlFile(path)
        changeName(path)
        page+=1