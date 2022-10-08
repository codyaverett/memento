# Apache Airflow
- python based ETL system
- Jobs are written in python

## Features
- Develop, schedule, and monitor batch-oriented workflows
- Extensible with various programming languages
- Web interface for managing the state of workflows
- Deployable on basically any system

## Workflows as code
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



## Reference
- https://airflow.apache.org/
