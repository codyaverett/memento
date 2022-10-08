# Airflow CLI

```shell
» airflow                                                                                                                   
usage: airflow [-h] GROUP_OR_COMMAND ...

positional arguments:
  GROUP_OR_COMMAND

    Groups:
      celery         Celery components
      config         View configuration
      connections    Manage connections
      dags           Manage DAGs
      db             Database operations
      jobs           Manage jobs
      kubernetes     Tools to help run the KubernetesExecutor
      pools          Manage pools
      providers      Display providers
      roles          Manage roles
      tasks          Manage tasks
      users          Manage users
      variables      Manage variables

    Commands:
      cheat-sheet    Display cheat sheet
      dag-processor  Start a standalone Dag Processor instance
      info           Show information about current Airflow and environment
      kerberos       Start a kerberos ticket renewer
      plugins        Dump information about loaded plugins
      rotate-fernet-key
                     Rotate encrypted connection credentials and variables
      scheduler      Start a scheduler instance
      standalone     Run an all-in-one copy of Airflow
      sync-perm      Update permissions for existing roles and optionally DAGs
      triggerer      Start a triggerer instance
      version        Show the version
      webserver      Start a Airflow webserver instance

options:
  -h, --help         show this help message and exit

airflow command error: the following arguments are required: GROUP_OR_COMMAND, see help above.
```

## Cheatsheet
```shell
airflow cheat-sheet                       | Display cheat sheet
airflow dag-processor                     | Start a standalone Dag Processor instance
airflow info                              | Show information about current Airflow and environment
airflow kerberos                          | Start a kerberos ticket renewer
airflow plugins                           | Dump information about loaded plugins
airflow rotate-fernet-key                 | Rotate encrypted connection credentials and variables
airflow scheduler                         | Start a scheduler instance
airflow standalone                        | Run an all-in-one copy of Airflow
airflow sync-perm                         | Update permissions for existing roles and optionally DAGs
airflow triggerer                         | Start a triggerer instance
airflow version                           | Show the version
airflow webserver                         | Start a Airflow webserver instance

Celery components
airflow celery flower                     | Start a Celery Flower
airflow celery stop                       | Stop the Celery worker gracefully
airflow celery worker                     | Start a Celery worker node

View configuration
airflow config get-value                  | Print the value of the configuration
airflow config list                       | List options for the configuration

Manage connections
airflow connections add                   | Add a connection
airflow connections delete                | Delete a connection
airflow connections export                | Export all connections
airflow connections get                   | Get a connection
airflow connections import                | Import connections from a file
airflow connections list                  | List connections

Manage DAGs
airflow dags backfill                     | Run subsections of a DAG for a specified date range
airflow dags delete                       | Delete all DB records related to the specified DAG
airflow dags list                         | List all the DAGs
airflow dags list-import-errors           | List all the DAGs that have import errors
airflow dags list-jobs                    | List the jobs
airflow dags list-runs                    | List DAG runs given a DAG id
airflow dags next-execution               | Get the next execution datetimes of a DAG
airflow dags pause                        | Pause a DAG
airflow dags report                       | Show DagBag loading report
airflow dags reserialize                  | Reserialize all DAGs by parsing the DagBag files
airflow dags show                         | Displays DAGs tasks with their dependencies
airflow dags show-dependencies            | Displays DAGs with their dependencies
airflow dags state                        | Get the status of a dag run
airflow dags test                         | Execute one single DagRun
airflow dags trigger                      | Trigger a DAG run
airflow dags unpause                      | Resume a paused DAG

Database operations
airflow db check                          | Check if the database can be reached
airflow db check-migrations               | Check if migration have finished
airflow db clean                          | Purge old records in metastore tables
airflow db downgrade                      | Downgrade the schema of the metadata database.
airflow db init                           | Initialize the metadata database
airflow db reset                          | Burn down and rebuild the metadata database
airflow db shell                          | Runs a shell to access the database
airflow db upgrade                        | Upgrade the metadata database to latest version

Manage jobs
airflow jobs check                        | Checks if job(s) are still alive

Tools to help run the KubernetesExecutor
airflow kubernetes cleanup-pods           | Clean up Kubernetes pods (created by
                                          | KubernetesExecutor/KubernetesPodOperator) in
                                          | evicted/failed/succeeded/pending states
airflow kubernetes generate-dag-yaml      | Generate YAML files for all tasks in DAG. Useful for
                                          | debugging tasks without launching into a cluster

Manage pools
airflow pools delete                      | Delete pool
airflow pools export                      | Export all pools
airflow pools get                         | Get pool size
airflow pools import                      | Import pools
airflow pools list                        | List pools
airflow pools set                         | Configure pool

Display providers
airflow providers auth                    | Get information about API auth backends provided
airflow providers behaviours              | Get information about registered connection types with
                                          | custom behaviours
airflow providers get                     | Get detailed information about a provider
airflow providers hooks                   | List registered provider hooks
airflow providers links                   | List extra links registered by the providers
airflow providers list                    | List installed providers
airflow providers logging                 | Get information about task logging handlers provided
airflow providers secrets                 | Get information about secrets backends provided
airflow providers widgets                 | Get information about registered connection form widgets

Manage roles
airflow roles create                      | Create role
airflow roles delete                      | Delete role
airflow roles export                      | Export roles (without permissions) from db to JSON file
airflow roles import                      | Import roles (without permissions) from JSON file to db
airflow roles list                        | List roles

Manage tasks
airflow tasks clear                       | Clear a set of task instance, as if they never ran
airflow tasks failed-deps                 | Returns the unmet dependencies for a task instance
airflow tasks list                        | List the tasks within a DAG
airflow tasks render                      | Render a task instances template(s)
airflow tasks run                         | Run a single task instance
airflow tasks state                       | Get the status of a task instance
airflow tasks states-for-dag-run          | Get the status of all task instances in a dag run
airflow tasks test                        | Test a task instance

Manage users
airflow users add-role                    | Add role to a user
airflow users create                      | Create a user
airflow users delete                      | Delete a user
airflow users export                      | Export all users
airflow users import                      | Import users
airflow users list                        | List users
airflow users remove-role                 | Remove role from a user

Manage variables
airflow variables delete                  | Delete variable
airflow variables export                  | Export all variables
airflow variables get                     | Get variable
airflow variables import                  | Import variables
airflow variables list                    | List variables
airflow variables set                     | Set variable
```

## Related
[[apache airflow]]
[[apache airflow quickstart]]