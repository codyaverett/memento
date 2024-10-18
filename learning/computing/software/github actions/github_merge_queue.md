# Github Merge queue

- Requires a branch protection set up with auto merge when ready enabled
- You'll need to run a subset of tests in your pull_request workflow
- You'll need to run the rest of the test suite when the `merge_group` event happens

The same workflow can specify both pull_request and merge_queue events to run the same set of tests in both scenarios

``` yaml
name: Validate code

on:
  merge_group:
  pull_request:

jobs:
  validate-pr:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    - name: Display info
      run: | 
        pwd
        tree -a -I '.git'
        git status
    - name: Run slow CI (emulated by a long sleep)
      run: sleep 300
```
