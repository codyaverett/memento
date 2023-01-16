---
name: Crun Error Git
created: 2023-01-16T00:45:22-06:00
updated: 2023-01-16T00:47:41-06:00
aliases: 
tags: 
---
# Crun Error Git

`xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun`

- happened after osx software update
- fix by reinstalling xcode tools `xcode-select --install`
