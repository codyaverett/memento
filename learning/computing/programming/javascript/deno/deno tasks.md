---
name: Deno Tasks
created: 2022-11-21T04:47:35-06:00
updated: 2022-11-21T04:49:15-06:00
aliases: 
tags: deno, cli 
---
# Deno Tasks

Tasks are like scripts from `npm` package.json files.

```json
// usage:
// deno task start
  "tasks": {
    "start": "deno run -A --watch=static/,routes/ dev.ts"
  },
```

