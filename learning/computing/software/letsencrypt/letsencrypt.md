---
title: letsencrypt
created: 2022-10-19T11:33:46-05:00
updated: 2022-11-16T15:59:19-06:00
---

- Secure and free certificate authority

## Certbot

Cert bot is a tool that 

```shell
# For debian/ubuntu systems
sudo apt install certbot python3-certbot-nginx

# For rhel/fedora systems
sudo dnf install certbot python3-certbot-nginx
# sudo dnf install certbot certbot-nginx
```

## Configure Nginx
```
certbot --nginx
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Which names would you like to activate HTTPS for?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: averett.cloud
2: cody.averett.cloud
3: heather.averett.cloud
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 2
Requesting a certificate for chainlinklabs.cody.averett.cloud

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/cody.averett.cloud/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/cody.averett.cloud/privkey.pem
This certificate expires on 2023-01-17.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for cody.averett.cloud to /etc/nginx/conf.d/cody.averett.cloud.conf
Congratulations! You have successfully enabled HTTPS on https://cody.averett.cloud
```


## Managing certs with ansible
[[Todo]]
