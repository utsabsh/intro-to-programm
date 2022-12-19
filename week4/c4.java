import java.util.HashMap;

public class c4 {
    public static void main(String[] args) {
        HashMap<Integer,String> view = new HashMap<Integer,String>();
        view.put(1,"air");
        view.put(2,"water");
        view.put(3,"fire");
        view.put(4,"earth");
        System.out.println("collection view is :"+view.values());
    }
}
