---
name: Finding Ldap Servers with Nslookup
created: 2022-09-17T02:28:08-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Finding Ldap Servers with Nslookup

```shell
nslookup -type=srv _ldap._tcp.DOMAINNAME
```
