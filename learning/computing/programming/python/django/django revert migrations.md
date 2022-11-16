---
created_at: 2022-10-07T03:27:59-05:00
modified_at: 2022-11-16T15:34:55-06:00
created: 2022-11-16T15:35:27-06:00
updated: 2022-11-16T15:35:27-06:00
---

Sometimes you want to backlevel a migration, you can do that with the migrate command.

```shell
python manage.py migrate store 0003
```

`0003` here is the migration file number you want to migrate to.
