# Airflow configuration

## Get local config
```shell
# cp config to local machine
docker cp container:/home/airflow/airflow.cfg .
```

## Override 

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

```