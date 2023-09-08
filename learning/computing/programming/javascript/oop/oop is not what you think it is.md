---
name: Oop is Not What You Think it is
created: 2023-09-07T23:05:49-05:00
updated: 2023-09-07T23:08:05-05:00
aliases: 
tags: 
---
# Oop is Not What You Think it is

Object oriented programming is more than just objects.  It's about encapsulating black boxes of code that can be used in a modular way.

An object is not just an object, it is an abstraction on top of a messaging pattern.

Request Objects and Response Objects.

```javascript
class RecipientList {
  constructor() {
    this.recipients = [];
  }

  addRecipient(recipient) {
    this.recipients.push(recipient);
  }

  removeRecipient(recipient) {
    const index = this.recipients.indexOf(recipient);
    if (index > -1) {
      this.recipients.splice(index, 1);
    }
  }

  getRecipientCount() {
    return this.recipients.length;
  }

  getRecipients() {
    return this.recipients;
  }
}
```

In this example, the `RecipientList` class represents a list of recipients. It has the following methods:

- `addRecipient(recipient)`: adds a recipient to the list.
- `removeRecipient(recipient)`: removes a recipient from the list.
- `getRecipientCount()`: returns the number of recipients in the list.
- `getRecipients()`: returns an array of all the recipients in the list.

You can use this object to create and manipulate recipient lists in your code. For example:

```javascript
const recipients = new RecipientList();

recipients.addRecipient("john@example.com");
recipients.addRecipient("mary@example.com");
recipients.addRecipient("jane@example.com");

console.log(recipients.getRecipientCount()); // Output: 3
console.log(recipients.getRecipients()); // Output: ["john@example.com", "mary@example.com", "jane@example.com"]

recipients.removeRecipient("mary@example.com");

console.log(recipients.getRecipientCount()); // Output: 2
console.log(recipients.getRecipients()); // Output: ["john@example.com", "jane@example.com"]
```

This is just a basic example of how you could implement a recipient list object in JavaScript. Depending on your specific needs, you may want to add additional functionality or properties to the class.
