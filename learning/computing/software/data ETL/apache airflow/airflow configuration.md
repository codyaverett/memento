---
aliases: 
tags: 
created: 2022-10-27T22:30:11-05:00
updated: 2022-11-16T16:51:04-06:00
name: airflow configuration
---
# Airflow Configuration

## Get Local Config
```shell
# cp config to local machine
docker cp container:/home/airflow/airflow.cfg .
```

## Override
Override config by environment var
- AIRFLOW__CORE__ENVNAME

## Sequential Executor
- runs tasks one at a time, even if there are parallel tasks in play

```
executor=SequentialExecutor
```

## Local Executor
- Runs parallel tasks on a single machine
```
executor=LocalExecutor
sql_alchemy_conn=postgresql+psycopg2://<user>:<password>@<host>/<db>
```

## Celery Executor
- scaling out requests on multiple machines
```
executor=CeleryExecutor
sql_alchemy_conn=postgresql+psycopg2://<user>:<password>@<host>/<db>
celery_result_backend=postgresql+psycopg2://<user>:<password>@<host>/<db>
celery_broker_url=redis://:@redis:6379/0
```