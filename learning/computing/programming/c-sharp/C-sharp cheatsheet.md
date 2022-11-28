---
name: Arrays
created: 2022-11-14T23:29:59-06:00
updated: 2022-11-28T17:45:27-06:00
aliases: 
tags: c-sharp, cheatsheet
---

```toc
```

# Arrays
Arrays are similar to variables, but can hold more than one value.

## Syntax

```c#
DataType[ ] ArrayName = { Comma Separated Values } // Array of any size 

DataType[] ArrayName = new DataType[3] {Command Separated Values } //Expects 3 values
```

## Example

```C#
string[] MyGames = {"Banjo Kazooie", "Skyrim"};
string[] MyMovies = new string[3] {"Spiderman", "Interstellar", "Limitless"};
```

# Intro
C# is a powerful Object Orientated language, for those coming from Java or C++ you should be able to pick up the syntax for C# quickly. 

A few points: 
- The language is case-sensitive (So A and a are different) 
- Lines terminate with semi-colons 
- Code is put in code blocks { } 
- Inline comments start with // 
- Block comments start with /* */ 
- XML comments start with ///

# Variables

To declare a variable you specify the data type and variable name followed by a value. 

## Syntax
DataType variableName = value; 

## Naming Rules
- Variables must start with underscore or letter 
- Variables cannot contain spaces 
- Variables can contain numbers 
- Cannot contain symbols (accept underscore)

## Example

```c#
string Name = "string example";
int Year = 2022;
```

# Strings

## Concatenation
Concatenation is done through the + operator.

### Example
```C#
Console.WriteLine("Hello " + "World")
```

## New Line

### Example
```C#
Console.WriteLine("Hello \n" + "World");
```

## String.Format
Formats an object, you specify the formatting you wish to perform, the following formats an integer and displays the currency symbol.

### Example
```C#
Console.WriteLine(string.Format("{0:C}", 5));
```

Depending on your computers regional settings you will see $5.00 displayed (You'll see your countries currency symbol). The `0:C` is the formatting we wish to do, in this case it means format the first parameter (0) and show a currency sign.

# Conditional Statements

## If Statements
if statements are used to execute code based on a condition.  The condition must evaluate to true for the code to execute.

### Syntax
```C#
if (true)
{

}
```

### Example
```C#
if (Year > 2021)
{
	Console.WriteLine("Hello World!");
}
```

## Else Statements
if a condition does not evaluate to true you can use an if else statement to execute other code.

### Example
```C#
if (Year > 2024)
{
	Console.WriteLine("Hello World");
}
else
{
	Console.WriteLine("Year is: " + Year);
}
```

## Switch Statement
Similar to the If else statement, however it has these benefits.

- Much easier to read and maintain.
- Much cleaner than using nested if else code blocks.
- It only evaluates one variable

### Syntax
```C#
switch (switch_on)
{
	default:
}
```

### Example
```C#
switch (Year)
{
	case 2021 :
		Console.WriteLine("It's 2021!");
		break;
	case 2022 :
		Console.WriteLine("It's 2022!");
		break;
	default :
		Console.WriteLine("It's " + Year + "!");
		break;
}
```
The `break` keyword is required as it prevents case falling.
> Several cases can be stacked on purpose though.

# Loops

## While Loops
Continuously loops code until a condition becomes false.

### Syntax
```C#
while (true)
{

}
```

### Example
```C#
while (Year >= 2021)
{
	if (Year != 2100)
	{
		Console.WriteLine(Year++);
	}
	else
	{
		break; // Break out of the while loop
	}
}
```

Make sure your condition evaluates to false at some point otherwise the loop is endless and it can result in errors.

## For Loop

Similar to the `while loop`, but you specify when the loop will end.

### Syntax
```C#
for (int i = 0; i < length; i++)
{

}
```

### Example
```C#
for (int i = 0; i <= 100; i++)
{
	Console.WriteLine(i);
}
```

This prints out 1 to 100.

## For Each
The for each loop is used to loop around a collection. (Such as an array)

### Syntax
```C#
foreach (var item in collection)
{

}
```

### Example
```C#
foreach (string movie in MyMovies)
{
	Console.WriteLine(movie);
}
```

# Exceptions, Methods & Classes

## Try Catch Blocks
Used to catch any exceptions that are likely to occur.

### Syntax
```C#
try
{

}
catch (Exception)
{
	throw;
}
```

### Example
```C#
try
{
	string result = "ok";
	/* The following line will throw an exception
		because strings can't be converted to numbers 
		like this */
	Console.WriteLine(Convert.ToInt32(result) + 10);
}
catch (Exception ex)
{
	Console.WriteLine(ex.Message);
}
```

## Methods

### Syntax
```C#
public void MethodName()
{
	// Void methods do not return a value
}

public static void MethodName()
{
	/* Does not return a value, the class does 
		not need to be initialized for static methods
		to be used */
}

public static DataType MethodName()
{
	/* Requires a value to be returned, class does not need
		to be initialzed for static method to be used */
}
```

### Example
```C#
public static void WelcomeUser()
{
	Console.WriteLine("Hello User!");
}
```

#### Passing Parameters
```C#
public static void WelcomeUser(string Name)
{
	Console.WriteLine("Hello " + Name + "!");
}
```

Since both methods have the same name and different parameters (One takes no parameters and the other one does) this is considererd an overloaded method.

#### Returning Data
```C#
public static DateTime Tomorrow()
{
	return DateTime.Now.AddDays(1);
}
```

All the examples above are static, this allows us to use the methods without initializing the class.

### Class Accessors

Public - accessible outside of the class
Private - only accessible inside the same class

# Classes

## Syntax
```C#
Class MyClassName
{

}
```

## Example
```C#
class Car
{
	public void Manufacturer(string name)
	{
		Console.WriteLine(name);
	}
}
```

To use the method in the class, the class must be initialized first

```C#
Car MyNewCar = new Car();

MyNewCare.Manufacturer("Audi");
```

Static methods are useful, make sure you are using the right design for your classes and methods. A good example is the Math class, to perform simple calculations you do not want to be initializing the class all the time, that’s why most methods are static.

# Reference
- https://www.thecodingguys.net/resources/cs-cheat-sheet.pdf
