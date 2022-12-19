import java.util.*;
public class b5{
    private static boolean isSortedarray(int[]array,int n){
        if(n==1||n==0) return true;
        return array[n-2]<=array[n-1] && isSortedarray(array,n-1);
    }
    public static void main(String[]args){
        int[]arr={1,2,3,5,4};
        System.out.println("The array"+Arrays.toString(arr)+""+(isSortedarray(arr,arr.length)?"is":"is not")+"sorted.");
        
        arr=new int[]{1,2,3,4,5};
        System.out.println("The array"+Arrays.toString(arr)+"  "+(isSortedarray(arr,arr.length)? "is":"is not")+"sorted.");
    }
}