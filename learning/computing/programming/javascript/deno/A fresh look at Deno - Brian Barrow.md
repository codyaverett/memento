---
name: A Fresh Look at Deno - Brian Barrow
created: 2022-10-19T10:22:33-05:00
updated: 2022-11-21T05:24:47-06:00
aliases: 
author: Brian Barrow
tags: deno, article
---
# A Fresh Look at Deno - Brian Barrow

## What is Deno
- New Javascript runtime
- V8 engine
- built using rust

## Why Though?
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

## Real World Deno
Deepgram's SDK

## Managing Dependencies
- Repetitive
- Best to maintain a central dependency file
```typescript
export from "./scopes. ts"
export { DefaultOptions from "./defaultOptions.ts"
export * from "./types/index.ts";
export from "./deepgram.ts";
export from "./helpers/index.ts";
export from "./transcription/index.ts";
export from "./projects.ts";
export * from "./members.ts";
export from •/keys.ts";
export from "./usage.ts";
export * from "./invitation. ts";
export from "./billing.ts";
export * as querystring from "https://deno. land/x/querystring@v1.0.2/mod.js";
```

other files can import like 
```typescript
import { MemberList, Message, querystring } from ". /deps.ts";
```

## Deno Deploy
- distributed system
- Runs JS, TS and WASM at the edge
- Very Fast 
- Deploy in less than 1 second

Deno deploy powers supabase and netlify edge functions



## Fresh
progressive web framework made for Deno

```typescript
// routes/plain.tsx
import { HandlerContext, Handlers } from "$fresh/server.ts";

export cost handler: Handlers = {
	GET (_req: Request,_ctx: HandlerContext)
	return new Response ("Hello World");
};
```

```typescript-jsx
routes/html.tsx COPY
/** @jsx h */
import { h } from "preact";
import { PageProps from "$fresh/server.ts";

export default function Page (props: PageProps) {
	return <div>You are on the page '{props .url.href}'.</div>;
}
```