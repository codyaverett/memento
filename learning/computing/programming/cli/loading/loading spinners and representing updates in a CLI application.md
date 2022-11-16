---
created: 2022-11-16T15:11:31-06:00
updated: 2022-11-16T15:11:31-06:00
---
# Loading spinners and representing updates in an CLI application

There are many super cool CLI applications out there that do things beyond what you'd think is even capable from inside of a terminal application.

It's simpler then you might think to create a simple loader.  You just need to understand more about standard input and output and take control of the terminals rendering process.

e.g. NodeJS

```javascript
var twirlTimer = (function() {
  var P = ["\\", "|", "/", "-"];
  var x = 0;
  return setInterval(function() {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);
})();
```

e.g. Python

```python
"""
This program is designed to create
and animate a simple loading animation.
"""

from sys import stdout as terminal
from time import sleep
from itertools import cycle
from threading import Thread

done = False

def animate():
for c in cycle(['|', '/', '-', '\\']):
	if done:
		break

terminal.write('\rloading ' + c)
terminal.flush()
sleep(0.1)
terminal.write('\rDone! ')
terminal.flush()

t = Thread(target=animate)
t.start()
sleep(5)
done = True
```

Both of these examples remind me very much of a simple pattern called the [[game loop]].
