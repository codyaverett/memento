---
name: Node to Deno Cheatsheet
created: 2022-11-21T03:43:06-06:00
updated: 2022-11-21T03:55:37-06:00
aliases: 
tags: cheatsheet, node, deno, cli
---
# Node to Deno Cheatsheet

| **Node.js** | **Deno**  |
|---------|-------|
| `node file.js` | `deno run file.ts` |
| `npm i -g`  | `deno install`  |
| `npm i` / `npm install`  | n/a  |
| `npm run` | `deno task` |
| `eslint` | `deno lint` |
| `prettier` | `deno fmt` |
| `rollup` / `webpack`/ etc | `deno bundle` |
| `package.json` | `deno.json` / `deno.jsonc` / `import_map.json` |
| `tsc` | `deno check` |
| `typedoc` | `deno doc` |
| `jest` / `ava` / `mocha` / `tap` / etc | `deno test` |
| `nodemon` | `deno run/lint/test --watch` |
| `nexe` / `pkg` | `deno compile` |
| `npm explain` | `deno info` 
| `nvm` / `n` / `fnm` | `deno upgrade` |
| `tsserver` | `deno lsp`
| `nyc` / `c8` / `istanbul` | `deno coverage` |
| `benchmarks` | `deno bench` |
