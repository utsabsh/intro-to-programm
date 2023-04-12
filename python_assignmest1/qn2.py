##name:Utsab shrestha
##ID:2329761

def sum_between(low, high):
    if low > high:
        return 0
    else:
        return low + sum_between(low+1, high)

# Prompt user for input
while True:
    try:
        low = int(input("Enter the low number: "))
        high = int(input("Enter the high number: "))
        break
    except ValueError:
        print("Invalid input. Please enter integers only.")

# Check for valid input
if low > high:
    print("Invalid input. The low number cannot be higher than the high number.")
else:
    # Calculate sum using recursive function
    total_sum = sum_between(low, high)
    print("The sum of values between", low, "and", high, "is:", total_sum)
