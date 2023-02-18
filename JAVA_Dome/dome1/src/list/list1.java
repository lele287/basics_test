package list;

import lele.lele;

import java.util.*;

public class list1 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("hello");
        list.add("kangle");
        list.add("nihao");
        System.out.println(list);


//      TreeSet比较器排序  Set比较器排序且去重，排序规则  年龄>姓名
        TreeSet<lele> ii = new TreeSet<lele>(new Comparator<lele>() {
            @Override
            public int compare(lele s1, lele s2) {
                int num = s1.getAge()-s2.getAge();
                int num2 = num==0?s1.getName().compareTo(s2.getName()):num;
                return num2;
            }
        });

        lele l1 = new lele("kangle",20);
        lele l2 = new lele("kk",30);
        lele l3 = new lele("ll",10);
        lele l4 = new lele("lp",10);
        lele l5 = new lele("ll",10);

        ii.add(l1);
        ii.add(l2);
        ii.add(l3);
        ii.add(l4);
        ii.add(l5);

        System.out.println("--------------------");
        for (lele s : ii){
            System.out.println(s.getName()+","+s.getAge());
        }

//        创建随机数对象,并且set去重
        Random r = new Random();
        HashSet<Integer> set = new HashSet<>();
        int num=0;

        System.out.println("--------------------");
        for (int i =0;i<10;i++) {
            num = r.nextInt(10);
            set.add(num);
        }

        for (int i:set) {
            System.out.println(i);
        }


//        泛型
        System.out.println("----------------");
        lele aa = new lele();
        aa.fanxing(1);
        aa.fanxing("qq");
        aa.fanxing(true);
    }
}
