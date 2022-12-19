import java.util.Hashtable;

public class c3 {
    public static void main(String[] args) {
        Hashtable<Integer,String> count = new Hashtable<Integer,String>();
        count.put(1,"black");
        count.put(2,"red");
        count.put(3,"yellow");
        count.put(4,"blue");
        count.put(5,"violet");
        System.out.println("size of the hashtable:"+count.size());
    }
}
