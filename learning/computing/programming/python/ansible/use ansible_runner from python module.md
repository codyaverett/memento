---
aliases: 
tags: 
title: use ansible_runner from python module
created: 2022-10-21T23:40:03-05:00
updated: 2022-11-16T16:49:15-06:00
name: use ansible_runner from python module
---
# use ansible_runner from python module

- Ansible core itself has a python API, but it is not meant for public use and could break due to internal changes at RedHat.
- Ansible_runner is the package used by the CLI interface to interact with Ansible core
- [Docs](https://ansible-runner.readthedocs.io/en/latest/python_interface/)

