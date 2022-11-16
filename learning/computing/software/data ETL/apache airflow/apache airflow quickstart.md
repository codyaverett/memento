---
aliases: 
tags: 
created: 2022-10-08T16:41:43-05:00
updated: 2022-11-16T16:51:04-06:00
name: apache airflow quickstart
---
# Apache Airflow Quickstart

- Have Python and pip installed

Run these commands in your terminal or create a script and run them for you in a reproducible way. e.g. an install/update script and a start script so you don't have to remember all the specifics.

```shell
# Airflow needs a home. `~/airflow` is the default, but you can put it
# somewhere else if you prefer (optional)
export AIRFLOW_HOME=~/airflow

# Install Airflow using the constraints file
AIRFLOW_VERSION=2.4.1
PYTHON_VERSION="$(python --version | cut -d " " -f 2 | cut -d "." -f 1-2)"
# For example: 3.7
CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
# For example: https://raw.githubusercontent.com/apache/airflow/constraints-2.4.1/constraints-3.7.txt
pip install "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}"

# The Standalone command will initialise the database, make a user,
# and start all components for you.
airflow standalone

# Visit localhost:8080 in the browser and use the admin account details
# shown on the terminal to login.
# Enable the example_bash_operator dag in the home page
```

Alternatively, instead of running airflow standalone, you can run the setup commands separately.
```shell
airflow db init

airflow users create \
    --username admin \
    --firstname Peter \
    --lastname Parker \
    --role Admin \
    --email spiderman@superhero.org

airflow webserver --port 8080

airflow scheduler
```

## Details
- uses a SQLite database for a single instance, this limits parallelization and you will need to choose another option for scaling
- Read about [production deployments]([Production Deployment](https://airflow.apache.org/docs/apache-airflow/stable/production-deployment.html))

## Triggering Tasks
```shell
# run your first task instance
airflow tasks run example_bash_operator runme_0 2015-01-01
# run a backfill over 2 days
airflow dags backfill example_bash_operator \
    --start-date 2015-01-01 \
    --end-date 2015-01-02
```

## Related
- [[apache airflow]]