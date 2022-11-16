---
created: 2022-11-16T15:11:30-06:00
updated: 2022-11-16T15:11:30-06:00
---
```bash
while IFS= read -r line; do
    echo "... $line ..."
done <<< "$list"
```

