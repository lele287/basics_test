-- 针对学生成绩表stuMark，由于考试难度偏大，因此需要加分，加分规则如下：
-- 90分以上加1分
-- 80-90分加2分
-- 70-80分加3分
-- 70分以下加5分
-- 当有同学加到100分，或者平均分达到80分后结束加分
select avg(labExam) from stumark
-- 课后练习
create procedure p_6()
begin
  -- 定义变量，保存最高分和平均分
  declare maxScore int;
	declare avgScore int;
	select max(labExam),avg(labExam) into maxScore,avgScore from stumark;
  WHILE not (maxScore >= 100 or avgScore >= 80) DO
		update stuMark 
		set labExam = case
										when labExam > 90 then labExam + 1
										when labExam > 80 then labExam + 2
										when labExam > 70 then labExam + 3
										else labExam + 5
									end;
		select max(labExam),avg(labExam) into maxScore,avgScore from stumark;				
	END WHILE;
end;
call p_6()
-- 分页存储过程1（传参方式：开始行的索引位置，每页多少行记录数）
select * from emp limit 0,2;
select * from emp limit 2,2;
create procedure p_7(rowIndex int,pageSize int)
begin
  select * from emp limit rowIndex,pageSize;
end;
call p_7(0,2);
call p_7(2,2);
-- 分页存储过程2（传参方式：第？页，每页多少行记录数）（pageIndex，pageSize = 2）
-- 1:[0 - pageSize)
-- 2:[pageSize,pageSize*2)
-- 3:[pageSize*2,pageSize*3)
-- pageIndex:[(pageIndex-1)*pageSize,pageIndex*pageSize)
create procedure p_8(pageIndex int,pageSize int)
begin
  declare startIndex int;
	set startIndex = (pageIndex-1)*pageSize; -- 计算指定页的开始行索引
  select * from emp limit startIndex,pageSize;
end;
call p_8(1,2);
call p_8(2,2);
-- 编写存储过程，输入需要查询的数据表和每页显示记录数量和页码，实现对指定数据表记录的分页查询
drop procedure p_9;
create procedure p_9(tableName varchar(10),pageIndex int,pageSize int)
begin
  declare startIndex int;
	declare str_page varchar(100);
	set startIndex = (pageIndex-1)*pageSize; -- 计算指定页的开始行索引
	-- 拼接SQL查询分页语句(重点)
  set str_page = CONCAT('select * from ',tableName,' limit ',startIndex,',',pageSize);
	set @strsqls = str_page;
	prepare strsql from @strSqls;
	execute strsql;
	deallocate prepare strsql;
end;
call p_9('dept',2,2);
-- 添加一批成绩,事务处理可以保证原子性
select * from stuMark
create procedure p_10()
begin
	DECLARE t_error  int;
	DECLARE  CONTINUE HANDLER FOR SQLEXCEPTION SET t_error = 1; -- 监控系统报错，存在时标记为1
	START TRANSACTION;		-- 开启事务机制
	insert into stuMark values('S271818','S25301',80,80);	
	insert into stuMark values('S271819','S25302',80,80);	
	insert into stuMark values('S271818','S25303',80,80);	
	-- 判断是否存在系统错误
	IF t_error = 1  THEN
			ROLLBACK;  -- 撤销一系列的操作
	ELSE
			COMMIT;    -- 提交一系列操作
	END  IF;
end;
call p_10()