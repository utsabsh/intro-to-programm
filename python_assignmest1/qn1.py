##name:Utsab shrestha
##ID:2329761

# Prompt user for personal details
gender = input("Enter your gender (M/F): ")
weight = float(input("Enter your weight in kg: "))
height = float(input("Enter your height in cm: "))
age = int(input("Enter your age in years: "))

# Prompt user for level of weekly exercise
print("Exercise Category Codes:\n0 - Little to no exercise\n1 - Light exercise (1–3 days per week)\n2 - Moderate exercise (3–5 days per week)\n3 - Heavy exercise (6–7 days per week)\n4 - Very heavy exercise (twice per day, extra heavy workouts)")
exercise_code = int(input("Enter your exercise category code: "))

# Calculate BMR based on gender and personal details
if gender == "M":
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
else:
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

# Calculate daily kilocalorie intake based on exercise category code
if exercise_code == 0:
    daily_kc_intake = bmr * 1.2
elif exercise_code == 1:
    daily_kc_intake = bmr * 1.375
elif exercise_code == 2:
    daily_kc_intake = bmr * 1.55
elif exercise_code == 3:
    daily_kc_intake = bmr * 1.725
else:
    daily_kc_intake = bmr * 1.9

# Print results
print("Your BMR is:", round(bmr, 2), "kilocalories per day")
print("Your recommended daily kilocalorie intake is:", round(daily_kc_intake, 2), "kilocalories")
