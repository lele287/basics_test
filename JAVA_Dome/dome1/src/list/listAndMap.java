package list;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class listAndMap {
    public static void main(String[] args) {
        ArrayList<HashMap<Integer,String>> myList = new ArrayList<>();

        HashMap<Integer,String> myMap1 = new HashMap<>();
        myMap1.put(1001,"张三");
        myMap1.put(1002,"李四");
        myList.add(myMap1);

        HashMap<Integer,String> myMap2 = new HashMap<>();
        myMap2.put(2001,"康康");
        myMap2.put(2002,"乐乐");
        myMap2.put(2003,"康乐");
        myList.add(myMap2);

        System.out.println(myList);

        for (HashMap<Integer,String> m:myList
             ) {
            Set<Integer> ids = m.keySet();
            for (Object i:ids
                 ) {
                String value = m.get(i);
                System.out.println(i+", "+value);
            }
        }

    }

}
