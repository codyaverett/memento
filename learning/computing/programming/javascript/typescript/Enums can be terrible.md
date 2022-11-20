---
name: Enums can be terrible
created: 2022-11-20T13:56:14-06:00
updated: 2022-11-20T13:56:28-06:00
aliases: 
tags: 
---
# Enums can be terrible

```typescript
enum AuthMethod {
	push = 0,
	sms = 2,
	voice = 1,
}

console.log(Object.value(AuthMethod)) // gives all the keys and all the values
```

During runtime, javascript creates strings with the corresponding keys and the keys and the values.


