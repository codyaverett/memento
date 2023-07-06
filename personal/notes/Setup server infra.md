---
name: Setup server infra
created: 2023-07-06T03:33:02-05:00
updated: 2023-07-06T03:33:04-05:00
aliases: 
tags: 
---
# Setup server infra

```
sudo . /etc/os-release
sudo apt install -t ${VERSION_CODENAME}-backports cockpit

sudo apt-get install cockpit -y
sudo systemctl enable --now cockpit.socket
sudo apt-get install podman cockpit-podman -y
sudo systemctl enable --now podman
```

## Reference


