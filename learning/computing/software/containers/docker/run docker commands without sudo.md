---
aliases: 
tags: 
created: 2022-10-21T13:55:06-05:00
updated: 2022-11-16T16:51:04-06:00
name: run docker commands without sudo
---
# Run Docker Commands without Sudo

## 1. Add the `docker` Group if it Doesn't Already Exist

```console
$ sudo groupadd docker
```

## 2. Add the Connected User `$USER` to the Docker Group

Optionally change the username to match your preferred user.

```console
$ sudo gpasswd -a $USER docker
```

**IMPORTANT**: Log out and log back in so that your group membership is re-evaluated.

## 3. Restart the `docker` Daemon

```console
$ sudo service docker restart
```
