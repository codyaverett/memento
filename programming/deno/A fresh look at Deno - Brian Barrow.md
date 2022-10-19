# A fresh look at Deno - Brian Barrow

## What is Deno
- New Javascript runtime
- V8 engine
- built using rust

## Why though?
Ryan Dal's regret with Node:
- No promises (to start out)
- JS in Web vs in Node can be different
- WebSocket api is supported in 1.4 of Deno, but Node follows a different spec
- Deno support the same fetch api from version 1 where Node 
- Deno is secure by default (System calls are blocked unless explicitly allowed)
```shell
Env access: --allow-env
Network access: --allow-net
File Read access: --allow-read
File Write access: --allow-write
Allow Subprocess: --allow-run
Allow all: --allow-all, -A
```

Configurable permissions
```shell
## allow access to specific domain
den run --allow-net=github.com
## allow access to specific folder
den run --allow-read=/projects
```

Dependency Management
- Similar to Browser JS
- Imported directly from URLs
```javascript
import { assertEquals ) from "https://deno.land/std@0.148.0/testing/asserts.ts";

assert Equals ("hello", "hello") ;
assert Equals ("world", "world") ;

console.log ("Asserted!);
```

- Version 1.25 has experimental npm support
- Es Modules 
- Deno supports typescript out of the box
- Built-in tooling
```shell
formatter deno fmt
linter    deno lint
testing   deno test
```

- Deno ships with a standard library (influenced by Go std)

## Real world Deno
Deepgram's SDK
