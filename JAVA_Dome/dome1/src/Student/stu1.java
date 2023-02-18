package Student;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class stu1 {
    public static void main(String[] args) {
        ArrayList<Student> myarr = new ArrayList<>();
        while (true) {
            System.out.println("输入1\t存取数据：");
            System.out.println("输入2\t查询数据：");
            System.out.println("输入3\t删除数据：");
            System.out.println("输入4\t退出：");

            Scanner sc = new Scanner(System.in);
            System.out.println("请输入：");
            String num = sc.nextLine(); //字符串类型
//          int num = sc.nextInt();         //整数类型

            if (num.equals("1")) {
                cun(myarr);
            } else if (num.equals("2")) {
                cha(myarr);
            } else if (num.equals("3")) {
                shan(myarr);
            } else if (num.equals("4")) {
                return;
            } else {
                System.out.println("请重新输入");
            }

        }
    }

    public static void cun(ArrayList<Student> arr) {
//        arr 与 myarr 内存地址相同

        System.out.println("开始添加...");
        Student s = new Student();

//        键盘录入
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入姓名：");
        String line = sc.nextLine();

        boolean a = false;
        for (int i = 0; i < arr.size(); i++) {
            if (line.equals(arr.get(i).getName())) {
                a = true;
                break;
            }
        }
        if (line.trim().length() == 0) {
            a = true;
        }

        if (a) {
            System.out.println("输入信息错误，请重新输入！");
        } else {
            s.setName(line);
            arr.add(s);
            System.out.println("添加成功");
        }

    }


    public static void cha(ArrayList<Student> arr) {
        System.out.println("开始查询...");
        if (arr.size() == 0) {
            System.out.println("暂无数据。请输入数据后再尝试查询！");
            return;
        }
        for (int i = 0; i < arr.size(); i++) {
            System.out.println(arr.get(i).getName());
        }
        System.out.println("查询完毕");
    }

    public static void shan(ArrayList<Student> arr) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入需要删除的名称：");
        String test = sc.nextLine();

        if (arr.size() == 0) {
            System.out.println("暂无数据，请输入数据后再尝试删除！");
            return;
        }
        for (int i = 0; i < arr.size(); i++) {
            if (test.equals(arr.get(i).getName())) {
                arr.remove(i);
                System.out.println("删除成功");
                return;
            }
        }

        System.out.println("删除失败，请重新输入！");

    }
}
