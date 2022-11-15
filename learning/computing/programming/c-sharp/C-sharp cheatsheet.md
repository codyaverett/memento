```toc
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

## Naming rules
- Variables must start with underscore or letter 
- Variables cannot contain spaces 
- Variables can contain numbers 
- Cannot contain symbols (accept underscore)

## Example

```c#
string Name = "string example";
int Year = 2022;
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

