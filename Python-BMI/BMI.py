# Welcome message
print("Welcome to the BMI Calculator!")

# Get user input for weight
weight = float(input("Please enter your weight in kilograms: "))

# Get user input for height
height = float(input("Please enter your height in meters: "))

# Ensure valid input
if weight <= 0 or height <= 0:
    print("Weight and height must be positive numbers.")
else:
    # Calculate BMI
    bmi = weight / (height ** 2)

    # Display the BMI result
    print(f"\nYour BMI is: {bmi:.2f}")

    # Determine the BMI category
    if bmi < 18.5:
        category = "underweight"
    elif 18.5 <= bmi < 24.9:
        category = "normal weight"
    elif 25 <= bmi < 29.9:
        category = "overweight"
    else:
        category = "obese"

    # Display the category
    print(f"You are classified as: {category}.")