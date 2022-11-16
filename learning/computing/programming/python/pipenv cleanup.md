---
created_at: 2022-10-10T01:57:49-05:00
modified_at: 2022-11-16T15:37:10-06:00
created: 2022-11-16T15:37:40-06:00
updated: 2022-11-16T15:37:40-06:00
---

The gist is, sometimes you delete a folder without removing the pip virtual environment first.

To remove an environment
```shell
# from the dirc
pipenv --rm
```

But if it doesn't exist, you will have to manually clean it up.

This script helps though.

https://github.com/geeseven/pipenv-cleanup


## Related
- [[python programming language]]