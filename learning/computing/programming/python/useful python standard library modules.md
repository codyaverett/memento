---
name: Useful Python Standard Library Modules
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Useful Python Standard Library Modules
## Abc
- use to define the APIs for dynamically loaded extensions as abstract base classes
- helps extension authors understand which methods of an API are required and which are optional.
- Abstract base classes are built into some other OOP languages, but lots of python programmers don't know we have them as well.

## Atexit
- allows you to register functions for your program to call whit it exits

## Argparse
- provides functions for parsing command line arguments

## Bisect
- binary search
- can search sparse lists where the search value may not be included in the data

## Calendar
- provides a number of date-related functions

## Codecs
provides functions for encoding and decoding data

## Collections
- useful data structures
	- `namedtuble` for creating small, class-like data structures that need to hold data without any associated logic
		- It's easy to convert from a named tuple to a regular class if logic does need to be added later , since `namedtuple` supports accessing attributes by name.
- `ChainMap` makes a good stackable namespace
	- `ChainMap` can be used to create contexts for rendering templates or managing configuration settings from different sources with clearly defined precedence.

## Copy
- provides functions for copying data

## Csv
- provides functions for reading and writing CSV files

## Datetime
- provides classes for handling dates and times

## Fnmatch
- provides functions for matching Unix-style filename patterns

## Concurrent
- provides async computation (native in python 3)

## Glob
- provides functions for matching unix-style path patterns

## Io
- provides functions for handling I/O streams
- In Python 3, it also containtains StringIO which allows you to treat strings as files

## Json
- provides functions for reading and writing data in JSON format

## Logging
- provides access to Python's own built-in logging functionality

## Multiprocessing
- allows you to run multiple subprocesses from your application, while providing an API that makes them look like threads

## Operator
- provides functions implementting the basic Python operators, which you can use instead of having to write your own lambda expressions

## Os
- provides access to basic OS functions

## Random
- provides functions for generating pseudorandom numbers

## Re
- provides regular expression functionality

## Sched
- provides an event scheduler without using multithreading

## Slect
- provides access to the select() and poll() functions for creating event loops

## Shutil
- provides access to high-level file functions

## Signal
- provides functions for handling POSIX signals

## Tempfile
- provides functions for creating temporary files and directories

## Threading
- provides access to high-level threading functionality

## Urllib
- provides functions for handling and parsing URLs

## Uuid
- allows you to generate Universally Unique Identifiers (UUIDs)