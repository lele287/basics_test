package list;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.TreeSet;

public class poker {
    public static void main(String[] args) {
//        根据索引存储牌
        HashMap<Integer,String> mm = new HashMap<>();
//        存储索引
        ArrayList<Integer> ii = new ArrayList<>();

//        生成牌
        String[] hua = {"♥","♦","♠","♣"};
        String [] num = {"3","4","5","6","7","8","9","10","J","Q","K","A","2"};
        int myIndex = 0;
        for (String i :num) {
            for (String h:hua) {
                String pai = h+i;
                mm.put(myIndex,pai);
                ii.add(myIndex);
                myIndex++;
            }
        }
        mm.put(myIndex,"小王");
        ii.add(myIndex);
        myIndex++;
        mm.put(myIndex,"大王");
        ii.add(myIndex);


//        洗牌
        Collections.shuffle(ii);

        TreeSet<Integer > seat1 = new TreeSet<>();
        TreeSet<Integer > seat2 = new TreeSet<>();
        TreeSet<Integer > seat3 = new TreeSet<>();
        TreeSet<Integer > seatDown = new TreeSet<>();
        for (int i = 0; i < ii.size(); i++) {
            int in = ii.get(i);
            if(ii.size()-i <= 3){
                seatDown.add(in);
            }else if (i%3==0){
                seat1.add(in);
            }else if (i%3==1){
                seat2.add(in);
            }else if (i%3==2){
                seat3.add(in);
            }
        }

        lookPoker("小明",seat1,mm);
        lookPoker("小红",seat2,mm);
        lookPoker("小明",seat3,mm);
        lookPoker("底牌",seatDown,mm);

    }

    public static void lookPoker(String name,TreeSet<Integer >ts,HashMap<Integer,String> hp){
        System.out.print(name+"的牌是:");
        for (Integer i:ts
             ) {
            System.out.print(hp.get(i)+" ");
        }
        System.out.print(" 共"+ts.size()+"张牌");
        System.out.println();
    }
}
