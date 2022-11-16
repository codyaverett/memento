---
title: create airflow user
created: 2022-10-27T21:32:04-05:00
updated: 2022-11-16T15:49:04-06:00
---

```shell
airflow users create \
  --username admin \
  --firstname FIRST_NAME \
  --lastname LAST_NAME \
  --role Admin \
  --email admin@example.org
```