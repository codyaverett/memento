---
name: User Selected Graph Driver
created: 2023-05-30T20:14:36-05:00
updated: 2023-05-30T20:15:18-05:00
aliases: 
tags: 
---
# User Selected Graph Driver

User-selected graph driver "overlay" overwritten by graph driver "vfs" from database - delete libpod local files to resolve.

```shell
sudo rm -rf ~/.local/share/containers/
```
