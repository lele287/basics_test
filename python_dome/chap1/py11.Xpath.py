import threading
import time

import requests
from lxml import etree

import urllib.request
from urllib import parse
from bs4 import BeautifulSoup


# 代理
proxies={
    "http":"http://220.82.71.3"
}


#Xpath

# url = "https://suzhou.zbj.com/search/f/?type=new&kw=saas"
# resp = requests.get(url,proxies=proxies)
# # 解析
# html = etree.HTML(resp.text)
# divs = html.xpath("/html/body/div[6]/div/div/div[2]/div[4]/div[1]/div")
# for item in divs:
#     price = item.xpath("./div/div/div/a/text()")
#     print(price)


# head={
# "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
# }
# request = urllib.request.Request(url=url,headers=head)
# response = urllib.request.urlopen(request)
# html = response.read().decode('utf-8')
# soup = BeautifulSoup(html, 'html.parser')
# # print(soup)
# # html body.paidan-animation-env div div.bggary div.z-grid div.main-wrap.clearfix.services div.search-list-wrap.witkey-list-grid.j-service-provider-wrap.new-witkey-list-grid div.service-wrap div.item-wrap.j-sp-item-wrap.with-service div.witkey-item.grid-box div.grid-middle div.servicesAndCases-title a.desc
# li = soup.select(".item-wrap .witkey-item .grid-middle .servicesAndCases-title .desc")
# for item in li:
#     print(item.string)