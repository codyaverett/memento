---
created_at: 2022-10-21T13:55:06-05:00
modified_at: 2022-11-16T15:23:23-06:00
created: 2022-11-16T15:23:54-06:00
updated: 2022-11-16T15:23:54-06:00
---
# Run Docker commands without sudo

##### 1. Add the `docker` group if it doesn't already exist

```console
$ sudo groupadd docker
```

##### 2. Add the connected user `$USER` to the docker group

Optionally change the username to match your preferred user.

```console
$ sudo gpasswd -a $USER docker
```

**IMPORTANT**: Log out and log back in so that your group membership is re-evaluated.

##### 3. Restart the `docker` daemon

```console
$ sudo service docker restart
```
