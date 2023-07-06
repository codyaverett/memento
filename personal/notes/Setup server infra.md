---
name: Setup server infra
created: 2023-07-06T03:33:02-05:00
updated: 2023-07-06T03:36:07-05:00
aliases: 
tags: 
---
# Setup Server Infra

```
sudo . /etc/os-release
sudo apt install -t ${VERSION_CODENAME}-backports cockpit

sudo apt-get install cockpit -y
sudo systemctl enable --now cockpit.socket
sudo apt-get install podman cockpit-podman -y
sudo systemctl enable --now podman
```

## Reference

- [install cockpit ubuntu better server](https://www.techrepublic.com/article/install-cockpit-ubuntu-better-server/)
