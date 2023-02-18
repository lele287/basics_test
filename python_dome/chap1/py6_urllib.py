import urllib.request
from bs4 import BeautifulSoup

head={
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
}
request = urllib.request.Request("https://uland.taobao.com/sem/tbsearch?refpid=mm_26632258_3504122_32538762&keyword=%E5%A5%B3%E8%A3%85&clk1=17ccadb40da7d0d1d28e5ace789c9b58&upsId=17ccadb40da7d0d1d28e5ace789c9b58&spm=a2e0b.20350158.31919782.1&pnum=0",headers=head)
response = urllib.request.urlopen(request)
html = response.read().decode('UTF-8')
bs = BeautifulSoup(html,'html.parser')
# print(html)
# 便利文档树
# print(bs.head.contents[2])
# print(bs.find_all("a"))

# t_list=bs.find_all(href="javascript:;")
data=bs.select(".pc-search-items-list")
print(data)