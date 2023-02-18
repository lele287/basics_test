package lele;

public class lele {
    String name;
    //    int age;
//    private 私有，不可被外部引用，也可通过 set/get 方法进行 查询/更改
    private int age;


    //    Ait+Ins  快速创建 构造方法 和 get/set 方法
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
//        this.age = age;
//        在get方法内可筛选可更改的数据范围
        if (age > 0 && age < 100) {
            this.age = age;
        }
    }

    public int getAge() {
        return age;
    }

    //    构造方法  主要完成对象数据的初始化
    public lele() {System.out.println("无参构造方法");}
//
//    public lele(String name) {
//        System.out.println("带参构造方法," + name);
//    }

    public lele(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        lele lele = (lele) o;

        if (age != lele.age) return false;
        return name != null ? name.equals(lele.name) : lele.name == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        return result;
    }

    //    方法重载:一个类中有多个具有相同名称但参数不同的方法，则称为方法重载
    public void hello() {
        System.out.println("hello lele!");
    }

    public void hello(String name) {
        System.out.println("我是" + name);
    }

//    泛型
    public <T> void fanxing(T a){
        System.out.println(a);
    }

}
