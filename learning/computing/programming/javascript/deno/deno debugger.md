---
name: Deno Debugger
created: 2022-11-21T03:06:35-06:00
updated: 2022-11-21T03:11:30-06:00
aliases: 
tags: deno, debug
---
# Deno Debugger

Deno has an integrated debugger.  If we want to launch a program in debug mode manually we need to use the `--inspect-brk` flag.

```shell
deno run -A --inspect-brk main.ts
```

If you open the chrome inspector `chrome://inspect` you will see a deno process available to inspect.

![[Pasted image 20221121030930.png]]

Click inspect and a chrome debug window will appear.

![[Pasted image 20221121031120.png]]