# Handle SIGTERM events in python

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

## Reference
- https://stackoverflow.com/questions/18499497/how-to-process-sigterm-signal-gracefully