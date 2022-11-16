---
name: Shell Looping Through Lines in a Variable
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Shell Looping Through Lines in a Variable
```bash
while IFS= read -r line; do
    echo "... $line ..."
done <<< "$list"
```

