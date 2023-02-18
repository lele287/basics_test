import sqlite3

# 创建表
# id int primary key not null,

# sql = """
# create table company
#     (id INTEGER,
#     names text not null,
#     age int not null,
#     address char(50),
#     salary real);
# """

# 插入数据
sql = """
    insert into company (id,names,age,address,salary)
     values (3,'李四',32,'重庆',8000);
"""

# 查询数据
# sql = """
#     select id,names,address,salary form company
# """


conn = sqlite3.connect("test.db")  #打开或创建数据库
print('打开数据库')

c = conn.cursor()  # 获取游标

c.execute(sql)  # 执行sql语句

# 查询到的数据内容
# for row in cursor:
#     print("id = ",row[0])
#     print("name = ",row[1])
#     print("address = ",row[2])
#     print("salary = ",row[3],"\n")


conn.commit()  # 提交数据库操作
c.close()  # 关闭游标
conn.close()  # 关闭数据库
print("操作成功关闭链接")