-- 查询显示公司的全部员工数，每月的工资总额以及平均工资。
select count(empId) 总人数,sum(salary) 月工资总金额,avg(salary) 平均工资,max(salary) 最高薪资,min(salary) 最低薪资 from emp;
-- 显示员工中最早入职的日期和最晚入职的日期。
select  min(hireDate) 最早入职日期,max(hireDate) 最晚入职日期 from emp;
-- 查询当前拿佣金的人员总数。
select count(empId) from emp where comm is not null;
select count(comm) from emp    -- count函数会过滤掉null值的记录
-- 查询公司职位的总数。
select count(distinct job) from emp   -- 去重+统计
-- 按部门编号分组，显示员工总数和平均工资。
select deptId,count(empId) 部门员工总数,avg(salary) 部门平均工资  from emp group by deptId
-- select * from emp GROUP BY deptId; 只适用于MySQL,其他数据库中会显示语法错误
-- 按职位分组，求出每个职位的最高工资和最低工资。
select job,max(salary),min(salary) from emp GROUP BY job
-- 按职位分组，求出每个职位的员工人数，和工资总和，同时工资总和超过5000。
-- having是在分组统计的基础上，进行筛选；where不能使用统计函数进行条件筛选
select job,count(empId),sum(salary) from emp  group by job having sum(salary) > 5000 
-- 不合适语句（普通列和统计函数一起使用;有分组的情况下，普通列中出现非分组字段）
select eName,count(empId) from emp;
select eName,job,max(salary),min(salary) from emp GROUP BY job
-- 笛卡尔积
select * from emp,dept
-- 消除笛卡尔积
select empId,eName,d.deptId,dName,location from emp e,dept d where e.deptId = d.deptId  -- 数据表取别名
-- 查询显示每个员工的编号、姓名、工资、工资级别。
select empId,eName,salary,gradeId from emp e,salgrade s where e.salary between s.losal and s.hisal 
-- 99标准连接(内连接)
select empId,eName,d.deptId,dName,location  from emp e join dept d on e.deptId = d.deptId
-- 99标准连接（外连接，当数据不匹配时，显示出所有的数据，不匹配的用null）
select empId,eName,d.deptId,dName,location  from emp e left join dept d on e.deptId = d.deptId;
select empId,eName,d.deptId,dName,location  from emp e right join dept d on e.deptId = d.deptId
-- 显示员工的姓名、编号、职位和领导的编号和姓名
select  e2.empId,e2.eName,e2.job,e2.leader,e1.eName from emp e1 right join emp e2 on e1.empId = e2.leader
-- 查找工资比张金山高的所有员工信息
select * from emp e1 join emp e2 on e1.salary > e2.salary where e2.eName = '张金山';
-- 查询在C区工作的所有员工信息
select e.* from emp e join dept d on e.deptId = d.deptId where location = 'C区';  -- 表连接
select * from emp where deptId = (
  select deptId from dept where location = 'C区'				-- 子查询
)
-- 查询与张金山相同职位的所有员工信息
select * from  emp where job = (
select job from emp where eName = '张金山'
)
-- 查询工资高于全体员工平均工资的员工信息
select * from emp where salary > (
select avg(salary) from emp
)
-- from子查询,把一个查询语句放在from后，作为数据源，必须取个别名
select * from (select * from emp) temp

-- 查询每个部门编号、名称、所在位置，人数和平均工资
-- 14 * 4 = 5600 运算次数
select d.deptId,dName,location,count(empId),avg(salary) from emp e right join dept d on e.deptId = d.deptId group by e.deptId;
-- 4 * 3 + 14 = 26
select * from dept left join (
select deptId,count(empId),avg(salary) from emp group By deptId
) as temp on dept.deptId = temp.deptId

-- 查询薪资超出相同部门员工平均薪资的员工信息(相关子查询)
select * from emp e1 where salary > (
 select avg(salary) from emp e2 where e1.deptId = e2.deptId
)

-- 1.获取每个部门的平均薪资
select deptId,avg(salary) deptAvg from emp group by deptId
-- 2.合并员工表和平均薪资表
select * from emp join (select deptId,avg(salary) deptAvg from emp group by deptId) temp 
on emp.deptId = temp.deptId where salary > deptAvg

-- 分类查询
select empId 工号,eName 姓名,salary 月薪,
 case
   when salary < 1000 then '屌丝'
	 when salary between 1000 and 1500 then '草根'
	 when salary between 1501 and 3000 then '白领'
	 else '土豪'
 end 评价 from emp





