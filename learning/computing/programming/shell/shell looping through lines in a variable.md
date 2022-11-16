---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:51:04-06:00
name: shell looping through lines in a variable
---
# Shell Looping Through Lines in a Variable
```bash
while IFS= read -r line; do
    echo "... $line ..."
done <<< "$list"
```

