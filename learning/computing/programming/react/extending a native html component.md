---
name: Extending a Native Html Component
created: 2022-11-27T22:13:52-06:00
updated: 2022-11-27T22:15:55-06:00
aliases: 
tags: react
---
# Extending a Native Html Component

When you are expanding functionality or wrapping around a native html element such as `input`
you can extend the interface with that specific html element's type.

```typescript
interface ISearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isLarge?: boolean;
}
```
