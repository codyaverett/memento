---
name: Shell Looping Through Lines in a Variable
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-28T17:23:07-06:00
aliases: 
tags: shell, script
---
# Shell Looping Through Lines in a Variable
```bash
while IFS= read -r line; do
    echo "... $line ..."
done <<< "$list"
```

