# class Studentlele:
#     def __init__(self,name,age):
#         self.name=name
#         self.age=age
#     def eat(self):
#         print(self.name+str(self.age)+'岁了')
# stu1=Studentlele('张三',20)
# print(stu1.name,stu1.age)
# stu1.eat()
#
# # 继承
# print("---------继承-------------")
# class pas(Studentlele):
#     def __init__(self,name,age,stu_to):
#         super().__init__(name,age)
#         self.stu_to=stu_to
#     def eat(self):                   #方法重写
#         super(pas, self).eat()
#         print('{0}是个学生，学号为{1}'.format(self.name,self.stu_to))
# a=pas('李斯',50,1811200038)
# print(a.name,a.age,a.stu_to)
# a.eat()
# print(dir(a))
# class Studentlele:
#     pass