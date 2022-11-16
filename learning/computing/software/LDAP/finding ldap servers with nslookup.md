---
created_at: 2022-09-17T02:28:08-05:00
modified_at: 2022-11-16T15:25:30-06:00
created: 2022-11-16T15:26:02-06:00
updated: 2022-11-16T15:26:02-06:00
---

# Finding ldap servers with nslookup

```shell
nslookup -type=srv _ldap._tcp.DOMAINNAME
```
