-- 完整插入语句
insert into dept values(50,'法律部','10楼')
-- 插入部分语句
insert into dept(deptId,location) values(60,'18楼')
-- insert into dept(deptId,dName) values(70,'发展部') 注意不可为空的约束
select * from dept
-- 关于自动增长列的数据插入
create table TestTB(
 uId int auto_increment primary key,
 uName varchar(10) not null,
 uPwd varchar(10) not null
)
-- mysql自动增长列的添加可以接受手动输入
insert into TestTB VALUES(200,'Alex','666')
insert into TestTB(uName,uPwd) values('Mike','666')
select * from TestTB
-- 多行插入
create table temp(
  id int not null,
	pName varchar(20) not null,
	pLocation varchar(20) not null
)
insert into temp
select * from dept where deptId in (
  select distinct deptId from emp 
)
select * from temp
-- 创建数据表
create table stuInfo(
  stuName varchar(20),
  stuNo varchar(20) primary key,
  stuSex varchar(10),
  stuAge int,
  stuSeat int,
  stuAddress varchar(30)
);
create table stuMark(
	ExamNo char(7) primary key,
  stuNo varchar(20),
  writtenExam int,
  labExam int
);
insert into stuInfo VALUES('张秋丽','s25301','男',18,1,'北京海淀');
insert into stuInfo VALUES('李文才','s25302','男',31,2,'地址不详');
insert into stuInfo VALUES('李斯文','s25303','女',22,3,'河南洛阳');
insert into stuInfo VALUES('欧阳俊雄','s25304','男',28,4,'新疆武威哈');
insert into stuInfo VALUES('梅超风','s25318','女',23,5,'地址不详');
insert into stuMark values('S271811','S25303',93,59);
insert into stuMark values('S271813','S25302',63,91);
insert into stuMark values('S271816','S25301',90,83);
insert into stuMark values('S271817','S25318',63,53);
-- 删除temp的数据
delete from  temp where 1
-- 修改数据
update stuInfo set stuSex = '女',stuAddress='上海浦东' where  stuNo = 's25301'
select * from stuInfo
-- 创建视图，显示每个工资级别的员工数量，最高薪资，最低薪资，平均薪资
create view v_1
as
  select gradeId,count(empId) 人数 ,max(salary) 最高薪资,min(salary),avg(salary) 
	from emp e join salgrade s on e.salary between s.losal and s.hisal group by gradeId
create view v_2
as
  select gradeId 工资级别, 人数 from v_1
-- 使用视图
select * from v_2
-- 课堂练习第一部分
create view v_stuScore1
as
select (select count(1) from stuInfo) 应到人数,
       (select count(1) from stuMark) 实考人数,
			 (select count(1) from stuInfo) - (select count(1) from stuMark) 缺考人数
select * from v_stuScore1 
-- 课堂练习第二部分
create view v_stuScore2
as
select 
stuName 姓名,
s1.stuNo 学号,
case
 when writtenExam is null then '缺考'
 else writtenExam
end 笔试成绩,
case
 when labExam is null then '缺考'
 else labExam
end  机试成绩,
case
 when writtenExam >= 60 and labExam >= 60 then '是'
 else '否'end 是否通过
from stuInfo s1 left join stuMark s2
on s1.stuNo = s2.stuNo
select * from v_stuScore2
-- 课堂练习第三部分
create view v_stuScore3
as
select (select count(1) from stuInfo) 总人数,(select count(1) from v_stuScore2 where 是否通过='是') 通过人数,
 concat( round(100 * (select count(1) from v_stuScore2 where 是否通过='是') / (select count(1) from stuInfo)) ,'%') 通过率
select * from v_stuScore3
-- 获取员工表中的记录总数，并显示输出(存储过程方式)
create procedure p_1()
begin
  select count(1) 总人数 from emp; 
end;
-- 使用存储过程
call p_1()
-- 输入一个员工姓名，查询工资大于该员工的所有员工的信息
create procedure p_2(pName varchar(10))
begin
 select * from emp where salary > (
	 select salary from emp where eName = pName
 );
end;
call p_2('刘备')
-- 实现一个注册用户的功能，要求输入用户名和密码，然后返回该用户自动增长所生成的ID
create procedure p_3(p_uName varchar(10),p_uPwd varchar(10),out p_uId int)
begin
  -- 1.添加新用户
	insert into testtb(uName,uPwd) values(p_uName,p_uPwd);
	-- 2.返回新用户的id
	select max(uId) into p_uId from testtb;
end;
call p_3('张三','996',@newId);
select @newId
-- 用存储过程接受一个关键字，查询名称中包含该关键字的部门的员工总数、部门名称和平均薪资
create procedure p_4(keyword varchar(10))
begin
select dName,count(1),avg(salary) from emp e join (
select * from dept where dName like concat('%',keyword,'%')  -- '%技术%'
) t on e.deptId = t.deptId;
end;
call p_4('财务')
-- 存储过程中的语法
create procedure p_5(num int)
begin
  declare i int default 0;
	declare sum int default 0;
	WHILE i < num DO
		set sum = sum + i;
		set i = i + 1;
	END WHILE;
	select sum '累加结果';
end;
call p_5(10)
-- 数据分页
select * from emp limit 5    -- 显示记录的数量
select * from emp limit 0,5  -- 第一个参数是开始的索引位置，第二个参数显示记录的数量
select * from emp limit 1,3

-- 字段的值可以使用分类查询
select salary from emp
-- 分类加分
update emp set salary = case end