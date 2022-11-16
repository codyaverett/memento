---
aliases: 
tags: 
title: apache airflow
created: 2022-10-05T14:01:50-05:00
updated: 2022-11-16T16:49:15-06:00
name: apache airflow
---
# apache airflow

- Created Oct 2014 and announced June 2015
- [Joined the Apache Foundation](https://blogs.apache.org/foundation/entry/the-apache-software-foundation-announces44) March 2016
- python based ETL system
- Jobs are written in python
- [python client](https://github.com/apache/airflow-client-python)

## Reference
- [Official Documentation](https://airflow.apache.org/docs/)
- [Github issues](https://github.com/apache/airflow/issues)
- [Slack chat](https://s.apache.org/airflow-slack)
- [Improvement Proposals](https://cwiki.apache.org/confluence/display/AIRFLOW/Airflow+Improvement+Proposals)
- [Configuration]([Configuration Reference](https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html))

## Awesome Lists
- [Ecosystem](https://airflow.apache.org/ecosystem/)
- [Awesome Apache Airflow](https://github.com/jghoman/awesome-apache-airflow)
- [Awesome Airflow](https://github.com/msantino/awesome-airflow)

## Examples
- [Create bigquery github trends](https://github.com/tfayyaz/awesome-airflow/blob/master/examples/dags/bigquery_github_trends_v1.py)

## Features
- Develop, schedule, and monitor batch-oriented workflows
- Extensible with various programming languages
- Web interface for managing the state of workflows
- Deployable on basically any system

## Workflows as Code
- Workflows are written in python
	- Code allows for dynamic pipeline generation
	- Adaptable to environments due to extensions
	- Workflow parameterization is built in using [Jinja Templating](https://jinja.palletsprojects.com/)

Example:

```python
from datetime import datetime

from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator

# A DAG represents a workflow, a collection of tasks
with DAG(dag_id="demo", start_date=datetime(2022, 1, 1), schedule="0 0 * * *") as dag:

    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")

    @task()
    def airflow():
        print("airflow")

    # Set dependencies between tasks
    hello >> airflow()
```

## Boons to Airflow
-   Workflows can be stored in version control so that you can roll back to previous versions
-   Workflows can be developed by multiple people simultaneously
-   Tests can be written to validate functionality
-   Components are extensible and you can build on a wide collection of existing components

## Cons to Airflow
- Coding skills are highly recommended
- There isn't much low-code opportunities within the software

## Structure
1. Define Dag
2. Define Task Operators
3. Define the task dependency chains

## Reference
- https://airflow.apache.org/
