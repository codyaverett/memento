---
title: pipenv cleanup
created: 2022-10-10T01:57:49-05:00
updated: 2022-11-16T16:01:14-06:00
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