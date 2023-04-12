##name:Utsab shrestha
##ID:2329761
import matplotlib.pyplot as plt
import numpy as np

def f1(x):
    return 3 * x**2

def f2(x):
    return 4 * x - 3

# Generate x values between -5 and 15
x = np.linspace(-5, 15, 100)

# Calculate y values for both functions
y1 = f1(x)
y2 = f2(x)

# Plot both functions with markers
plt.plot(x, y1, label='f(x) = 3x^2')
plt.plot(x, y2, label='f(x) = 4x - 3')

# Add title and axis labels
plt.title("Graph of y = f(x)")
plt.xlabel("x")
plt.ylabel("y")

# Add grid
plt.grid(True)

# Show legend
plt.legend()

# Show the graph
plt.show()
