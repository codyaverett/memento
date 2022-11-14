# Polymorphism

I get asked about this topic occasionally by mentees and interviewers.  It's good to have a plan for how you would like to describe the concept of polymorphism to other humans.

## Example
Question: So, when a class inherits the attributes and methods of another class, is that considered polymorphism?
    
I like functional programming myself. You don't technically need to use classes, so it's actually a good thing that you question why you'd even want them at all. One thing that is helpful to understand is that classes can inherit the attributes and methods of another class. 

A dog class could exist 
- A dog can bark 
- A dog can poop 
- A dog can have a location property 
- A dog can move 
 
A Shiba Inu class inherits all the properties of a dog. 
- They can all bark, poop, and move too. 
- They may perform these methods slightly differently than a Weiner doggo would though. 
- This is a contrived example of course. Some people like to abstract problems out in this Object oriented way though.

There is also this concept of a "mix-in" where you have one class that inherits attributes and methods from multiple classes at once.