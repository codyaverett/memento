---
name: deno configuration
created: 2022-11-21T03:56:18-06:00
updated: 2022-11-21T03:58:00-06:00
aliases: 
tags: config, deno
---
# Deno Configuration

## Using Import Maps
It is possible to use import maps in the editor. The option Deno: Import Map (or deno.importMap if manually editing) should be set to the value of the import map file. If the path is a relative path, it will be resolved relative to the root of the workspace.

## Using a Configuration File
Typically a configuration file is not required for a Deno project. There are a few scenarios though where it might be useful, and if you want to have the same settings applied as when specifying the --config option on the command line, the Deno: Config option can be used (or deno.config if manually editing).

The Deno extension will also auto-identify and apply a deno.jsonc or deno.json by looking in the workspace root for the configuration file and applying it. Manually specifying a Deno: Config option will override this automatic behavior.

