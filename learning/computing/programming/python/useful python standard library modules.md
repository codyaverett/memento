---
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---
## abc
- use to define the APIs for dynamically loaded extensions as abstract base classes
- helps extension authors understand which methods of an API are required and which are optional.
- Abstract base classes are built into some other OOP languages, but lots of python programmers don't know we have them as well.

## atexit
- allows you to register functions for your program to call whit it exits

## argparse
- provides functions for parsing command line arguments

## bisect
- binary search
- can search sparse lists where the search value may not be included in the data

## calendar
- provides a number of date-related functions

## codecs
provides functions for encoding and decoding data

## collections
- useful data structures
	- `namedtuble` for creating small, class-like data structures that need to hold data without any associated logic
		- It's easy to convert from a named tuple to a regular class if logic does need to be added later , since `namedtuple` supports accessing attributes by name.
- `ChainMap` makes a good stackable namespace
	- `ChainMap` can be used to create contexts for rendering templates or managing configuration settings from different sources with clearly defined precedence.

## copy
- provides functions for copying data

## csv
- provides functions for reading and writing CSV files

## datetime
- provides classes for handling dates and times

## fnmatch
- provides functions for matching Unix-style filename patterns

## concurrent
- provides async computation (native in python 3)

## glob
- provides functions for matching unix-style path patterns

## io
- provides functions for handling I/O streams
- In Python 3, it also containtains StringIO which allows you to treat strings as files

## json 
- provides functions for reading and writing data in JSON format

## logging
- provides access to Python's own built-in logging functionality

## multiprocessing
- allows you to run multiple subprocesses from your application, while providing an API that makes them look like threads

## operator
- provides functions implementting the basic Python operators, which you can use instead of having to write your own lambda expressions

## os
- provides access to basic OS functions

## random
- provides functions for generating pseudorandom numbers

## re
- provides regular expression functionality

## sched
- provides an event scheduler without using multithreading

## slect
- provides access to the select() and poll() functions for creating event loops

## shutil
- provides access to high-level file functions

## signal
- provides functions for handling POSIX signals

## tempfile
- provides functions for creating temporary files and directories

## threading 
- provides access to high-level threading functionality

## urllib
- provides functions for handling and parsing URLs

## uuid
- allows you to generate Universally Unique Identifiers (UUIDs)