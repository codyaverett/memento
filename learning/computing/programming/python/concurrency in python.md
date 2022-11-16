---
title: concurrency in python
created: 2022-09-28T17:54:09-05:00
updated: 2022-11-16T15:48:50-06:00
---

## Async/Await
Python has an async await type of functionality like javascript's event loop.   Python uses a library called `asyncio` to enable async/await functionality in the python runtime.  It will spawn threads and processes on your behalf.

## Examples

Javascript

```javascript

const wait = async (s) => {
    setTimeout(() => {
        console.log("wating " + s + "s")
    }, s * 1000)
}
async function read_file() {
    console.log("initial read_file sleep(2.1)")
    await wait(2)
    console.log("read_file 1/2 wait(2)")
    await wait(0.1)
    console.log("read_file 2/2 wait(0.1)")
}
async function read_api() {
    console.log("initial read_api wait(2)")
    await wait(2)
    console.log("read_api whole wait(2)")
}
read_file()
console.log("does not block")
read_api()
console.log("the second time, won't block")
// initial read_file sleep(2.1)
// does not block
// initial read_api wait(2)
// the second time, won't block
// read_file 1/2 wait(2)
// read_api whole wait(2)
// read_file 2/2 wait(0.1)
// !!! Wait a moment
// wating 0.1s
// wating 2s 
// wating 2s
```

Python

```python

import asyncio

async def read_file():
    print("initial read_file asyncio.sleep(2 + 0.1)")
    await asyncio.sleep(2)
    print("read_file 1/2 asyncio.sleep(2)")
    await asyncio.sleep(0.1)
    print("read_file 2/2 asyncio.sleep(0.1)")

async def read_api():
    print("initial read_api asyncio.sleep(2)")
    await asyncio.sleep(2)
    print("read_api whole asyncio.sleep(2)")

async def gather():
    await asyncio.gather(
        asyncio.create_task(read_file()),
        asyncio.create_task(read_api()))
        
asyncio.run(gather())
"""
initial read_file asyncio.sleep(2.1)
initial read_api asyncio.sleep(2)
!!! Wait a moment
read_file 1/2 asyncio.sleep(2)
read_api whole asyncio.sleep(2)
read_file 2/2 asyncio.sleep(0.1)
"""
```

## Reference
- [Stack Overflow comparing JS event loop to Python asyncio](https://stackoverflow.com/questions/68139555/difference-between-async-await-in-python-vs-javascript)
