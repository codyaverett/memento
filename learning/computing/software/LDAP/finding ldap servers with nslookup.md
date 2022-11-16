---
title: finding ldap servers with nslookup
created: 2022-09-17T02:28:08-05:00
updated: 2022-11-16T15:56:23-06:00
---

```shell
nslookup -type=srv _ldap._tcp.DOMAINNAME
```
