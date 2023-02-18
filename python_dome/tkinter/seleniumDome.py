# selenium操作浏览器
import time
from urllib import parse

from selenium.webdriver import Firefox
from selenium.webdriver.common.keys import Keys

# 设置无头
from selenium.webdriver.firefox.options import Options

opt = Options()
opt.add_argument("--headless")
opt.add_argument("--disbale-gpu")
web = Firefox(options=opt)


# web = Firefox()
def resGet(url,keyword):
    web.get(url)
    # 查找元素,并点击
    web.find_element_by_xpath('/html/body/div[9]/div[1]/div[2]/div[2]/div[1]/div/p[1]/a').click()

    # 等待
    time.sleep(1)

    # input输入内容
    web.find_element_by_xpath('//*[@id="search_input"]').send_keys(keyword, Keys.ENTER)
    time.sleep(2)
    li_list = web.find_elements_by_xpath('//*[@id="s_position_list"]/ul/li')
    for item in li_list:
        jName = item.find_element_by_tag_name('h3').text
        jPrice = item.find_element_by_xpath('./div[1]/div[1]/div[1]/a/span').text
        jCompany = item.find_element_by_xpath('./div[1]/div[2]/div[1]/a').text
        print(jName, jPrice, jCompany)


# def main():


if __name__ == '__main__':
    keyword = parse.quote('web')
    resGet('http://www.lagou.com',keyword)
    web.close()