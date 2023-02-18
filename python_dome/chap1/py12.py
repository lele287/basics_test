import time

from urllib import parse
from bs4 import BeautifulSoup

# 导入Selenium
from selenium import webdriver
from selenium.webdriver.common.proxy import Proxy
from selenium.webdriver.common.proxy import ProxyType

page=0

# driver = webdriver.Firefox()

# 设置代理
proxy = Proxy(
    {
        'proxyType': ProxyType.MANUAL,
        'httpProxy': 'https://58.218.92.89:8272'
    }
)

driver = webdriver.Firefox(proxy=proxy)

listData = []
page = 0
keyword = parse.quote('')
for item in range(0,1):
    driver.get('https://www.appmovie.net/index.php/vod/show/id/2/page/1.html')
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    print(soup)
    driver.close()

