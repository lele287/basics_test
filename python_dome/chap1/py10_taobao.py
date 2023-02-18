import time

from urllib import parse
from bs4 import BeautifulSoup

# 导入Selenium
from selenium import webdriver
from selenium.webdriver.common.proxy import Proxy
from selenium.webdriver.common.proxy import ProxyType

# 设置无头
from selenium.webdriver.firefox.options import Options

opt = Options()
opt.add_argument("--headless")
opt.add_argument("--disbale-gpu")

# driver = webdriver.Firefox()
# 设置代理
proxy = Proxy(
    {
        'proxyType': ProxyType.MANUAL,
        'httpProxy': 'https://58.218.92.89:8272'
    }
)

driver = webdriver.Firefox(proxy=proxy, options=opt)


def fun_timer(totalPage, keyword):
    listData = []
    page = 0
    for item in range(0, totalPage):
        driver.get(
            'https://uland.taobao.com/sem/tbsearch?refpid=mm_26632258_3504122_32538762&keyword=' + keyword + '&pnum=' + str(
                page))
        # 解析(.page_source显示源码)
        html = driver.page_source
        soup = BeautifulSoup(driver.page_source, 'lxml')

        for item in soup.select('.pc-items-item'):
            try:
                if len(item.find_all(class_="pc-items-item-img")) > 0:
                    listImg = item.find_all(class_="pc-items-item-img")[0]["src"]
                else:
                    listImg = ''
            except KeyError as err:
                if err == 'src':
                    listImg = item.find_all(class_="pc-items-item-img")[0]["data-src"]
            listTitle = item.find_all(class_="title-text")[0].text
            listPrice = item.find_all(class_="coupon-price-afterCoupon")[0].text
            listShop = item.find_all(class_="seller-name")[0].text.replace('\ue667', '')
            listData.append({"Img": listImg, "Title": listTitle, "Price": listPrice, "Shop": listShop})
        page += 1
        time.sleep(0.1)
    print(listData)


def MainControl():
    # 汉字转义
    wode = input('请输入爬取的类别，比如(女装):')
    keyword = parse.quote(wode)
    myPage = input('请输入爬取的页数:')

    print('开始爬取...')
    fun_timer(int(myPage), keyword)
    print('爬取完毕!')
    continueSwitch = input('是否继续操作y/n:')
    if continueSwitch == "y":
        MainControl()
    else:
        driver.close()
        return;


if __name__ == '__main__':
    MainControl();
