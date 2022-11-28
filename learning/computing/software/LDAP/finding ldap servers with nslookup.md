---
name: Finding Ldap Servers with Nslookup
created: 2022-09-17T02:28:08-05:00
updated: 2022-11-28T17:43:16-06:00
aliases: 
tags: ldap, nslookup
---
# Finding Ldap Servers with Nslookup

```shell
nslookup -type=srv _ldap._tcp.DOMAINNAME
```
