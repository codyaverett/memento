---
name: Enums Can Be Terrible
created: 2022-11-20T13:56:14-06:00
updated: 2022-11-21T05:29:20-06:00
aliases: 
tags: [[typescript programming language]]
---
# Enums Can Be Terrible

```typescript
enum AuthMethod {
	push = 0,
	sms = 2,
	voice = 1,
}

console.log(Object.value(AuthMethod)) // gives all the keys and all the values


function doThing(authMethod: AuthMethod): void {
	
}

// VS using an object

const AuthMethod = {
	push: "Push",
	sms: "SMS",
	voice: "Voice",
} as const;

// Overriding type
type AuthMethod = typeof AuthMethod[keyof typeof AuthMethod];

dothing(AuthMethod.voice);

```

During runtime, javascript creates strings with the corresponding keys and the keys and the values.


