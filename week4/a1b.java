import java.util.*;
public class a1b {
    public static void main(String[] args) {
        List num = new ArrayList(Arrays.asList(23,16,14,33,19,6,1));
        for (int i = 0; i < num.size(); i++) {
            if ((int)num.get(i)==19){
                System.out.print(num.get(i));
            }

        }
    }
}
