---
name: linux sockets
created: 2023-06-20T00:44:33-05:00
updated: 2023-06-20T00:45:03-05:00
aliases: 
tags: 
---
# Linux Sockets

## Quick Overview

A socket is a file. But not all files have names. Here are a few examples of files that don't have names:

Any file that used to have a name, and is now deleted, but is still opened by a program.

An unnamed pipe, such as one created by the | shell operator.
Most sockets: any Internet socket, or a Unix socket which is not in the filesystem namespace (it can be in the abstract namespace or unnamed).

Files such as unnamed pipes or sockets are created by a process and can only be accessed in that process or in subsequently-created child processes. (This is not completely true: a process that has a pipe or socket (or any other file) open can transmit it to other processes via a Unix socket; this is known as file descriptor passing.)

Sockets that have a name (whether in the filesystem or abstract) can be opened using that name. Network sockets can be opened (or more precisely connected to) remotely from any machine that has appropriate connectivity.
