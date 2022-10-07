# django revert migrations

Sometimes you want to backlevel a migration, you can do that with the migrate command.

```shell
python manage.py migrate store 0003
```

`0003` here is the migration file number you want to migrate to.
