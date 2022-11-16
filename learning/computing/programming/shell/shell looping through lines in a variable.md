---
aliases: 
tags: 
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T16:49:15-06:00
name: shell looping through lines in a variable
---
# shell looping through lines in a variable
```bash
while IFS= read -r line; do
    echo "... $line ..."
done <<< "$list"
```

