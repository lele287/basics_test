from flask import Flask,render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'

# 传参默认类型为字符串（int:数字，数字类型）
@app.route('/user/<name>')
def welcome(name):
    return '你好:'+name

# 引入heml文件
@app.route('/index')
def html():
    time="2020.3.29"
    name = ['张三','李四','王五']
    return render_template("index.html",time = time,name=name)


if __name__ == '__main__':
    app.run()
