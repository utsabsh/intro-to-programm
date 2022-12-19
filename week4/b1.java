import java.util.Scanner;

public class b1 {
    public static void main(String[] args) {
        int[] arr={1,2,3,4,5,6,7,8,9,0};//array
        //taking input from user
        Scanner sc = new Scanner(System.in);
        System.out.println("enter a number that you want to check");
        int num = sc.nextInt();
        //loop to compare array to list
        for (int i = 0; i < arr.length; i++) {
            int x = arr[i];//storing array in x
            if (x== num){
                System.out.println(num +"is in array");//print output
            }else {
                System.out.println(num+" is not in array");
                break;
            }
        }
    }
}