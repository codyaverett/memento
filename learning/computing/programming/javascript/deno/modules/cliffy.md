---
name: Cliffy
created: 2022-11-21T04:13:33-06:00
updated: 2022-11-21T04:16:59-06:00
aliases: 
deno: https://deno.land/x/cliffy@v0.25.4
repository: https://github.com/c4spar/deno-cliffy 
tags: deno, cli, typescript, third-party
website: https://cliffy.io/
---
# Cliffy

CLI toolkit, prompts, tables, argument parsers, keypresses, keycodes, flags, commands, ansi

## Examples

### Ansi
```typescript
// ansi.ts
// deno run --unstable https://deno.land/x/cliffy@v0.25.4/examples/ansi.ts

import { colors, tty } from "https://deno.land/x/cliffy@v0.25.4/ansi/mod.ts";
import { delay } from "https://deno.land/std@0.161.0/async/delay.ts";

const error = colors.bold.red;
const warn = colors.bold.yellow;
const info = colors.bold.blue;

console.log(info("This is an info message!"));
console.log(warn("This is a warning!"));
console.log(error("This is an error message!"));
console.log(error.underline("This is a critical error message!"));

await delay(3000);

tty.cursorLeft.cursorUp(4).eraseDown();

```

### Command

```typescript
// command.ts
// deno run --allow-net=localhost:8080,deno.land https://deno.land/x/cliffy@v0.25.4/examples/command.ts

import { Command } from "https://deno.land/x/cliffy@v0.25.4/command/mod.ts";
import { serve } from "https://deno.land/std@0.161.0/http/server.ts";

await new Command()
  .name("reverse-proxy")
  .description("A simple reverse proxy example cli.")
  .version("v1.0.0")
  .option("-p, --port <port:number>", "The port number for the local server.", {
    default: 8080,
  })
  .option("--host <hostname>", "The host name for the local server.", {
    default: "localhost",
  })
  .arguments("[domain]")
  .action(async ({ port, host }, domain = "deno.land") => {
    console.log(`Listening on http://${host}:${port}`);
    await serve((req: Request) => {
      const url = new URL(req.url);
      url.protocol = "https:";
      url.hostname = domain;
      url.port = "443";

      console.log("Proxy request to:", url.href);
      return fetch(url.href, {
        headers: req.headers,
        method: req.method,
        body: req.body,
      });
    }, { hostname: host, port });
  })
  .parse();
```

### Flags

```typescript
// flags.ts
// deno run https://deno.land/x/cliffy@v0.25.4/examples/flags.ts

import { parseFlags } from "https://deno.land/x/cliffy@v0.25.4/flags/mod.ts";

const { flags } = parseFlags(Deno.args, {
  stopEarly: true,
  flags: [{
    name: "silent",
  }, {
    name: "port",
    type: "number",
    default: 8080,
  }, {
    name: "host",
    aliases: ["hostname"],
    type: "string",
    default: "localhost",
  }, {
    name: "verbose",
    aliases: ["v"],
    collect: true,
    value: (_, verbose = 0) => ++verbose,
  }],
});

console.log("Parsed flags: %O", flags);
```

### Keycode

```typescript
// keycode.ts
// deno run --unstable https://deno.land/x/cliffy@v0.25.4/examples/keycode.ts

import { KeyCode, parse } from "https://deno.land/x/cliffy@v0.25.4/keycode/mod.ts";

while (true) {
  const data = new Uint8Array(8);

  Deno.stdin.setRaw(true);
  const nread = await Deno.stdin.read(data);
  Deno.stdin.setRaw(false);

  if (nread === null) {
    break;
  }

  const keys: Array<KeyCode> = parse(data.subarray(0, nread));

  for (const key of keys) {
    if (key.ctrl && key.name === "c") {
      console.log("exit");
      Deno.exit();
    }
    console.log("Key pressed: %O", key);
  }
}
```

### Keypress

```typescript
// keypress.ts
// deno run --unstable https://deno.land/x/cliffy@v0.25.4/examples/keypress.ts

import { keypress, KeyPressEvent } from "https://deno.land/x/cliffy@v0.25.4/keypress/mod.ts";

/** Promise */
const event: KeyPressEvent = await keypress();
console.log("Key pressed: %s", event.key);

/** AsyncIterator */
for await (const event: KeyPressEvent of keypress()) {
  console.log("Key pressed: %s", event.key);
  if (event.ctrlKey && event.key === "c") {
    console.log("exit");
    break;
  }
}

/** EventTarget */
keypress().addEventListener("keydown", (event: KeyPressEvent) => {
  console.log("Key pressed: %s", event.key);
  if (event.ctrlKey && event.key === "c") {
    console.log("exit");
    keypress().dispose();
  }
});
```

### Prompt

```typescript
// prompt.ts
// deno run --unstable https://deno.land/x/cliffy@v0.25.4/examples/prompt.ts

import { Confirm, Input, Number, Secret } from "https://deno.land/x/cliffy@v0.25.4/prompt/mod.ts";

let hostname: string, port: number, password: string;

await main();

async function main() {
  hostname = await Input.prompt({
    message: "Enter the hostname",
    default: hostname ?? "localhost",
  });

  port = await Number.prompt({
    message: "Enter the port number",
    default: port ?? 80,
  });

  password = await Secret.prompt({
    message: "Enter your password",
    default: password,
  });

  console.log({ port, hostname, password });
  if (!await Confirm.prompt("Is everything correct?")) {
    await main();
  }
}
```

## Table

```typescript
// table.ts
// deno run https://deno.land/x/cliffy@v0.25.4/examples/table.ts

import { Cell, Table } from "https://deno.land/x/cliffy@v0.25.4/table/mod.ts";

const table = new Table(
  [
    new Cell("Row 1 & 2 / Column 1").rowSpan(2),
    "Row 1 / Column 2",
    "Row 1 / Column 3",
  ],
  [new Cell("Row 2 / Column 2 & 3").colSpan(2)],
  [
    new Cell("Row 3 & 4 / Column 1").rowSpan(2),
    "Row 3 / Column 2",
    "Row 3 / Column 3",
  ],
  [new Cell("Row 4 / Column 2 & 3").colSpan(2)],
  [
    "Row 5 / Column 1",
    new Cell("Row 5 & 6 / Column 2 & 3").rowSpan(2).colSpan(2),
  ],
);

table.push(["Row 6 / Column 1"]);

table.border(true).render();

```