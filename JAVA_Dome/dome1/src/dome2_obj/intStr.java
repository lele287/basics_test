package dome2_obj;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Scanner;

public class intStr {

    public static void main(String[] args) {
////        数组
//        myint();
//        System.out.println();
//        System.out.println("----------");
////        字符串
//        myStr();
//        System.out.println("----------");
////        字符串遍历
//        stringTest();

//        集合
        myArrayList();

    }

    //    数组定义
    public static void myint() {
        int[] arr = new int[]{1, 2, 4};
        int[] arr1 = new int[3];
        int[] arr2 = {2, 3, 4};

        for (int element : arr) {
            System.out.print(element + ",");
        }
        System.out.println();
        for (int element : arr1) {
            System.out.print(element + ",");
        }
        System.out.println();
        for (int element : arr2) {
            System.out.print(element + ",");
        }
    }

    //    字符串定义
    public static void myStr() {
        char[] chs = {'a', 'b', 'c'};
//        每次实例化对象即会创建一块内存地址，地址指向  chs  内存地址
        String s1 = new String(chs);
        String s2 = new String(chs);

//      直接赋值不会重新创建内地址，会使用  "abc" 的内存地址
        String s3 = "abc";
        String s4 = "abc";

//        ==    比较的是字符串内存地址
        System.out.println(s1 == s2);
        System.out.println(s1 == s3);
        System.out.println(s3 == s4);
        System.out.println("-----------------");
//        equals    比较的是字符串内容
        System.out.println(s1.equals(s2));
        System.out.println(s1.equals(s3));
        System.out.println(s3.equals(s4));
//        charAt    返回指定索引处的char值
        System.out.println(s1.charAt(1));
    }

    //    字符串遍历
    public static void stringTest() {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入一个字符串");
        String line = sc.nextLine();

        for (int i = 0; i < line.length(); i++) {
//            charAt    返回字符串的第 i 个
            System.out.println(line.charAt(i));
        }

    }

    //    集合
    public static void myArrayList() {
        ArrayList<String> s = new ArrayList<>();

//        添加元素
        s.add("hello");
        s.add("11");
        s.add("lele");

//        指定位置添加
        s.add(1, "你好");

//        删除元素，返回被修改元素（传下标时）或布尔值（传元素值时）
//        System.out.println(s.remove("11"));
//        System.out.println(s.remove(0));

//        修改元素返回被修改元素
        System.out.println(s.set(2,"康康"));

//        获取元素
        System.out.println(s.get(3));

//        获取元素个数
        System.out.println(s.size());

        System.out.println(s);
    }
}
