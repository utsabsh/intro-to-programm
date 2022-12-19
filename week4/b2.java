public class b2 {
    public static void main(String[] args) {
        int[] arr={10,20,30,40,50};//arraylist
        int total=0;
        for (int i = 0; i < arr.length; i++) {
            int x = arr[i];
            total = x + total;


        }
        int average = total / arr.length;
        System.out.println(average+" is average mark obtained in physics");

    }
}
