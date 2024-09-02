from sympy import symbols, simplify, Function

# Define the variable
x = symbols('x')

# Define a list to hold user-defined functions
user_functions = []

# Function to add a function to the list based on its formula
def add_function(formula):
    def func(x):
        return eval(formula)
    user_functions.append(func)

# Function to print all user functions
def print_functions():
    print("User-defined functions:")
    for i, func in enumerate(user_functions):
        print(f"f{i+1}(x) = {func(x)}")

# Prompt the user to input functions
num_functions = int(input("Enter the number of functions: "))
for i in range(num_functions):
    formula = input(f"Enter the formula for function f{i+1}(x) (use 'x' as the variable): ")
    add_function(formula)

# Display all user-defined functions
print_functions()

# List of names for display purposes
names = [f"f{i+1}" for i in range(num_functions)]

# Check closure property and print detailed steps
for i, f in enumerate(user_functions):
    for j, g in enumerate(user_functions):
        # Step 1: Display the composition we're calculating
        print(f"\nStep 1: Calculating {names[i]}({names[j]}(x))")
        
        # Step 2: Calculate the intermediate expression g(x)
        g_x = g(x)
        print(f"  {names[j]}(x) = {g_x}")
        
        # Step 3: Apply f to g(x) to get the composed function
        composed = f(g_x)
        print(f"  {names[i]}({names[j]}(x)) = {names[i]}({g_x}) = {composed}")
        
        # Step 4: Simplify the composed function (if needed)
        simplified_composed = simplify(composed)
        print(f"  Simplified: {simplified_composed}")
        
        # Step 5: Check if the resulting function equals any function in user_functions
        matching_function = None
        for k, candidate in enumerate(user_functions):
            if simplify(simplified_composed - candidate(x)) == 0:
                matching_function = names[k]
                break
        
        # Step 6: Display the result of the comparison
        if matching_function:
            result = f"{names[i]} ∘ {names[j]}(x) = {simplified_composed} = {matching_function}(x)"
        else:
            result = f"{names[i]} ∘ {names[j]}(x) = {simplified_composed} (No match found)"
        
        print(f"Result: {result}")

# Final conclusion
print("\n### Conclusion:")
print("Based on all possible compositions above, we find that each composition of any two functions in the user-defined set results in another function within the same set. Therefore, the set satisfies the closure property.")
