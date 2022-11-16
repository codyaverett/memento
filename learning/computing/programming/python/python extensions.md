---
aliases: 
tags: 
title: python extensions
created: 2022-09-12T14:17:11-05:00
updated: 2022-11-16T16:49:15-06:00
name: python extensions
---
# python extensions

## VsCode

### Linting
Finds potential issues in your code
- pylint

Change your python environment to use python 3.x

### Degugging

Install `code.runner` extension

Also set `code.runner.runInTerminal` to true so you can interact with input prompts instead of all the output being isolated in the output pane
![[Pasted image 20220912144323.png]]

There are other implementations of python (like how javascript has different runtimes)
- CPython is the main
- Jython is python implemented in java
- IronPython is python implemented in C#
- PyPy is a subset of Python

F9 adds a breakpoint on your current line

### CPython
If you have code written in C, you convert the C code into machine code

### JavaByteCode
Compile to JavaByteCode and JVM converts into machine code

Python takes a similar approach
Python > CPython > PythonByteCode > PythonVirtualMachine > MachineCode

### Jython
Converts Python into java bytecode that is executed by the java virtual machine

### Autocompletion

### Code Formatting
There is a document for python code formatting standards
[https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/)

### Unit Testing

### Code Snippets

Python Extension comes with some python snippets out of box
