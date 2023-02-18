-- 获取所有数据
-- select empId,eName,job,leader,hireDate,salary,comm,deptId from emp;  
-- select * from emp;
-- 查询每个员工的编号、姓名
-- select empId,eName from emp;
-- 查询员工的职位
-- select job from emp;
-- 去重查询
-- select distinct job from emp;
-- 查询员工姓名、职位和年收入。年收入等于年薪加上每月100元伙食补贴。
-- select eName 姓名,job 职位,(salary+100)*12 年收入 from emp;
-- concat组合查询
-- select concat(empId,eName) from emp;
-- 查询月工资大于1500元的员工信息
select * from emp where salary > 1500;
-- 查询职位是销售员的员工信息
select * from emp where job = '销售员'
-- 查询月工资在1500和3000之间的员工信息
select * from emp where salary > 1500 and salary < 3000;
select * from emp where salary between 1500 and 3000
-- 查询月工资 在 1500和 3000之间，并且职位是经理的员工信息
select * from emp where salary > 1500 and salary < 3000 and job = '经理'
-- 查询职位是经理或者分析师，并且月薪大于2800的员工信息,注意优先级问题
select * from emp where (job = '经理' or job = '分析师') and salary > 2800;
-- in范围查询，相当于or运算
select * from emp where job in ('经理','分析师') and salary > 2800
-- 查询入职时间在1981年的员工信息
select * from emp where hireDate > '1980-12-31' and hireDate < '1982-1-1';
-- 查询所有姓名中包含’云’的员工信息。
select * from emp where eName like '%云%'
-- 查询没有奖金的员工信息,为空比较不能用等于
select  * from  emp where comm is null 
-- 查询奖金不为空的员工信息
select * from  emp where comm is not null
select * from emp where not comm is null
-- 查询员工信息，以工资从高到低排列；工资相同时，以入职日期从晚到早排列显示。
select * from emp  where job = '职员' order by salary desc,hireDate desc


