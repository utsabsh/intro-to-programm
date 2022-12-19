import java.util.HashSet;

public class c2 {
    public static void main(String[] args) {
        HashSet<String> hset1 = new HashSet<String>();
        hset1.add("banana");
        hset1.add("orange");
        hset1.add("apple");
        hset1.add("grapes");
        System.out.println("first Hashset" + hset1);
        HashSet<String> hset2 = new HashSet<String>();
        hset2.add("lemon");
        hset2.add("apple");
        hset2.add("orange");
        hset2.add("peach");
        System.out.println("second Hashset" + hset2);
        hset1.retainAll(hset2);
        System.out.println("Hashset content:");
        System.out.println(hset1);
    }
}
