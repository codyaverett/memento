---
aliases: 
tags: 
title: handle SIGTERM events in python
created: 2022-10-10T06:01:03-05:00
updated: 2022-11-16T16:49:15-06:00
name: handle SIGTERM events in python
---
# handle SIGTERM events in python

## Example 1
Handy for making sure connections are closed
```python
import signal
import time

class GracefulKiller:
  kill_now = False
  def __init__(self):
    signal.signal(signal.SIGINT, self.exit_gracefully)
    signal.signal(signal.SIGTERM, self.exit_gracefully)

  def exit_gracefully(self, *args):
    self.kill_now = True

if __name__ == '__main__':
  killer = GracefulKiller()
  while not killer.kill_now:
    time.sleep(1)
    print("doing something in a loop ...")
   
  print("End of the program. I was killed gracefully :)")
```

## Example 2
Seems more robust since it's global
```python
#!/usr/bin/python

from time import sleep
import signal
import sys


def sigterm_handler(_signo, _stack_frame):
    # Raises SystemExit(0):
    sys.exit(0)

if sys.argv[1] == "handle_signal":
    signal.signal(signal.SIGTERM, sigterm_handler)

try:
    print "Hello"
    i = 0
    while True:
        i += 1
        print "Iteration #%i" % i
        sleep(1)
finally:
    print "Goodbye"
```

Ctrl + C 
```shell
```python
$ ./signals-test.py default
Hello
Iteration #1
Iteration #2
Iteration #3
Iteration #4
^CGoodbye
Traceback (most recent call last):
  File "./signals-test.py", line 21, in <module>
    sleep(1)
KeyboardInterrupt
$ echo $?
1
```

SIGTERM
```python
$ ./signals-test.py default
Hello
Iteration #1
Iteration #2
Iteration #3
Iteration #4
Terminated
$ echo $?
143
```

Custom handler
```python
$ ./signals-test.py handle_signal
Hello
Iteration #1
Iteration #2
Iteration #3
Iteration #4
Goodbye
$ echo $?
0
```

## Example 3
I like this one because it uses the `with` keyword.  Looks nice, however someone in the comments pointed out:
> "you don't call the original handler when event occurs, thus any handlers will get ignored. And with addition to that that we have exception handling mechanism that may catch and ignore exception thrown by sys.exit(0), nested `with` statements with exception handlers in-between will lead to ignoring the termination request. (And make you hit ctrl+C) several times at least."
```python
import logging
import signal
import sys


class TerminateProtected:
    """ Protect a piece of code from being killed by SIGINT or SIGTERM.
    It can still be killed by a force kill.

    Example:
        with TerminateProtected():
            run_func_1()
            run_func_2()

    Both functions will be executed even if a sigterm or sigkill has been received.
    """
    killed = False

    def _handler(self, signum, frame):
        logging.error("Received SIGINT or SIGTERM! Finishing this block, then exiting.")
        self.killed = True

    def __enter__(self):
        self.old_sigint = signal.signal(signal.SIGINT, self._handler)
        self.old_sigterm = signal.signal(signal.SIGTERM, self._handler)

    def __exit__(self, type, value, traceback):
        if self.killed:
            sys.exit(0)
        signal.signal(signal.SIGINT, self.old_sigint)
        signal.signal(signal.SIGTERM, self.old_sigterm)


if __name__ == '__main__':
    print("Try pressing ctrl+c while the sleep is running!")
    from time import sleep
    with TerminateProtected():
        sleep(10)
        print("Finished anyway!")
    print("This only prints if there was no sigint or sigterm")
```

## Reference
- https://stackoverflow.com/questions/18499497/how-to-process-sigterm-signal-gracefully