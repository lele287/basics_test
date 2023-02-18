import time

from urllib import parse
from bs4 import BeautifulSoup
import os

# 导入Selenium
from selenium import webdriver
from selenium.webdriver.common.proxy import Proxy
from selenium.webdriver.common.proxy import ProxyType

# 设置代理
proxy = Proxy(
    {
        'proxyType': ProxyType.MANUAL,
        'httpProxy': 'https://58.218.92.89:8272'
    }
)

driver = webdriver.Firefox(proxy=proxy)


def fun_timer():
    # with  open('data.txt', 'w') as f:
    #     f.write('qwer')

    driver.get('https://v.qq.com/x/search/?q=%E4%B8%87%E7%95%8C%E4%BB%99%E8%B8%AA&stag=102&smartbox_ab=')
    # 解析(.page_source显示源码)
    html = driver.page_source
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    htmls = soup.select('.result_episode_list .item a')
    for item in htmls:
        print(item['href'])


if __name__ == '__main__':
   fun_timer()
