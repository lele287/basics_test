package lele;

import com.sun.source.tree.Tree;

import java.lang.reflect.Array;
import java.util.Comparator;
import java.util.TreeSet;

public class dome_02 {
    public static void main(String[] args) {

        lele lele = new lele();         //实例化对象
        lele.name = "康乐";
        lele.setAge(-22);
        System.out.println(lele.name + "，" + lele.getAge());
        lele.hello();
        lele.hello("康康");
        System.out.println(lele);

        lele lele3 = lele;                  //引用内训地址
        System.out.println(lele3);

        lele lele2 = new lele();            //创建新内存
        System.out.println(lele2);

    }
}
