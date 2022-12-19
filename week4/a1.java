
import java.util.*;
public class a1 {
    public static void main(String[] args) {
        List<Integer> num = new ArrayList<Integer>(Arrays.asList(23,16,14,33,19,6,1));
        for (int i = 0; i < num.size(); i++) {
            if ((int)num.get(i)%2==1){
                if (i>0){
                    System.out.print(", ");

                }System.out.print(num.get(i));
            }
         
        }
    }
}
