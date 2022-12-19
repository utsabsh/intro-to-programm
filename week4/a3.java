import java.util.*;
public class a3 {
    public static void main(String[] args) {
        List fruit = new ArrayList(Arrays.asList("apple", "banana","pear","cherry"));
        System.out.println("the list of fruit is "+ fruit);
        fruit.set(0,"grapefruit");
        fruit.set(2,"date");
        fruit.set(4,"orange");
        System.out.println();
    }
}
