---
aliases: 
tags: 
title: python classes
created: 2022-09-16T22:40:47-05:00
updated: 2022-11-16T16:49:15-06:00
name: python classes
---
# python classes

These notes are from a mentoring session I had with my friend Ben.

## Notes

Created a Question class that will encapsulate situations like Defining a question, the answer to the question, and possible question answers if the question ends up being multiple choice.

```python
class Question:
    """_summary_
    A class that represents a question and its answer.
    Parameters:
        prompt: The question to ask the user.
        answer: The correct answer to the question.
        possible_answers: A list of possible answers to the question.
    Methods:
        ask_and_evaluate: Asks the question and evaluates the answer.
        is_correct: Returns True if the answer is correct, False otherwise.
    """

    # Constructor Method runs when an object is created
    def __init__(self, prompt: str, answer, possible_answers: list = None):
        self.prompt = prompt
        self.answer = answer
        self.possible_answers = possible_answers
        self.is_correct = None
        self.is_valid_question = True

        # If the answer is not in the list of possible answers
        if self.possible_answers != None and answer not in self.possible_answers:
            self.is_valid_question = False  # The question is not valid
            print("The answer is not in the possible answers, this Question is invalid")

    def ask_and_evaluate(self):
        print(self.prompt)
        self.is_correct = input("Your answer: ") == self.answer
        print("Correct!" if self.is_correct else "Incorrect!")

    def is_correct(self):
        if self.is_correct != None:
            return self.is_correct
        print("You must call ask_and_evaluate() before calling is_correct()")
        return False
```

Instantiate and run it like this
question1 = Question("What is 1 + 1?", "2", ["1", "2", "3", "4"])
question1.ask_and_evaluate()

Using python's REPL (runtime evaluation print loop) I can import the code and run it in an interactive way.

```python
>>> from quiz.question import Question
>>> Question
<class 'quiz.question.Question'>
>>> question1 = Question('What is 1 + 1', '2')
>>> question1.ask_and_evaluate()
What is 1 + 1
Your answer: 2
Correct!
>>> question1.is_correct
True
>>> question1.ask_and_evaluate()
What is 1 + 1
Your answer: 4
Incorrect!
>>> question1.is_correct
False 
```

Using with possible answers defined
```python
>>> question2 = Question("is red or blue better?", "green", ['red','blue'])
The answer is not in the possible answers, this Question is invalid
>>> question2 = Question("is red or blue better?", "blue", ['red','blue'])
>>> question2.prompt
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Question' object has no attribute 'prompt'
>>> question2.ask_and_evaluate()
is red or blue better?
Your answer: red
Incorrect!
>>> question2.ask_and_evaluate()
is red or blue better?
Your answer: blue
Correct!
>>> question2.ask_and_evaluate()
is red or blue better?
Your answer: green
Incorrect!
```

Hopefully, you can see how elegant using Objects can make your code  
It promotes a high level of reusability

I'm creating an Instance of the Question class .. I can create as many question variables as I want, I could even create a list of questions.

Every question you define will work the exact same way because they are derived from the same object classification.

Classes are like blueprints for new objects.

If you think of a video game, there are many different objects in the game.  Players, Items, Inventory, Boxes, Particles, etc.

Object oriented programming allows us to encapsulate data that is related to each of these things and lets us reuse them as many times as needed.

```python
~/Projects/play/coffee.py » python3                                                                                                                  caavere@Codys-MacBook-Pro
Python 3.9.13 | packaged by conda-forge | (main, May 27 2022, 17:00:33) 
[Clang 13.0.1 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from quiz.question import Question
>>> question3 = Question(prompt = "Are you a cool person?", answer = "yes", possible_answers = ['yes','no','maybe','negative'])
>>> question3.ask_and_evaluate()
Are you a cool person?
Possible answers: yes, no, maybe, negative
Your answer: no
Incorrect!
>>> question3.ask_and_evaluate()
Are you a cool person?
Possible answers: yes, no, maybe, negative
Your answer: asdfadsfasddsaf
Invalid answer, please try again
Your answer: kajsflkjasdlfkasdlkjasdjl
Invalid answer, please try again
Your answer: yes 4 sure
Invalid answer, please try again
Your answer: yes
Correct!
>>> 
>>> exit()
```

My directory structure
```shell
~/Projects/play/coffee.py » tree                                                                                                                     caavere@Codys-MacBook-Pro
.
├── main.py
├── main2.py
├── main3.py
└── quiz
    ├── __init__.py
    ├── mathQuiz.py
    └── question.py

1 directory, 6 files
```

I'm running python3 from where the 3 main files are on my computer ``~Projects/play/coffee.py`.

Running python3 from here just loads me into the python repl (`runtime evaluation print loop`)

Since my current working directory has a folder with an __init__.py in it, that directory is considered a python package.
`From quiz.question` i can `import Question`

Then I can use the Question class to define new Question object instances

```python
class Question:
    """_summary_
    A class that represents a question and its answer.
    Parameters:
        prompt: The question to ask the user.
        answer: The correct answer to the question.
        possible_answers: A list of possible answers to the question.
    Methods:
        ask_and_evaluate: Asks the question and evaluates the answer.
        is_correct: Returns True if the answer is correct, False otherwise.
    """

    # Constructor Method runs when an object is created
    def __init__(self, prompt: str, answer: str, possible_answers: list = None):
        self.prompt = prompt
        self.answer = answer
        self.possible_answers = possible_answers
        self.is_correct = None
        self.is_valid_question = True

        # If the answer is not in the list of possible answers
        if self.possible_answers != None and answer not in self.possible_answers:
            self.is_valid_question = False  # The question is not valid
            print("The answer is not in the possible answers, this Question is invalid")

    def ask_and_evaluate(self) -> None:
        print(self.prompt)
        self.show_possible_answers()

        if self.possible_answers != None:
            is_valid_answer = False
            while not is_valid_answer:
                answer = input("Your answer: ")
                if answer in self.possible_answers:
                    is_valid_answer = True
                    self.is_correct = answer == self.answer
                    print("Correct!" if self.is_correct else "Incorrect!")
                else:
                    print("Invalid answer, please try again")

    def show_possible_answers(self) -> None:
        if self.possible_answers != None:
            print("Possible answers: " + ", ".join(self.possible_answers))
        else:
            pass

    def is_correct(self):
        if self.is_correct != None:
            return self.is_correct
        print("You must call ask_and_evaluate() before calling is_correct()")
        return False
```

I've added a little bit more logic in the `ask_and_evaluate` method to let the test taker try again while incorrect responses are given to a multiple choice question

`functions` are called `methods` when they are defined on an object.
They essentially do the same thing, but methods automatically get a reference to self which allows the method to access the other object properties and other object methods defined in the same class.

## Reference
[[python basics]]