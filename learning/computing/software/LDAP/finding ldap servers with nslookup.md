---
aliases: 
tags: 
title: finding ldap servers with nslookup
created: 2022-09-17T02:28:08-05:00
updated: 2022-11-16T16:49:15-06:00
name: finding ldap servers with nslookup
---
# finding ldap servers with nslookup

```shell
nslookup -type=srv _ldap._tcp.DOMAINNAME
```
