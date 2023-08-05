---
name: Implicitly handled events
created: 2023-08-05T00:27:08-05:00
updated: 2023-08-05T00:27:53-05:00
aliases: 
tags: 
---
# Implicitly Handled Events

Implicit event handling refers to the browser's default behavior when certain events are triggered, without any explicit event handlers set up by the developer. Here are a few examples:

Link Navigation: When a user clicks on an anchor tag (<a>), the browser's default behavior is to navigate to the URL specified in the href attribute of the tag. This is an implicit event handling of the click event on anchor tags.

Form Submission: When a user clicks a submit button (<input type="submit"> or <button type="submit">) in a form, the browser's default behavior is to send a GET or POST request (based on the method attribute of the form) to the URL specified in the action attribute of the form.

Right Click Context Menu: When a user right-clicks on a web page, the browser's default behavior is to open the context menu. This is an implicit handling of the contextmenu event.

In each of these cases, you can use the preventDefault() method in an event handler to prevent the browser's default behavior and instead define your own behavior. For example, you can prevent a form from being submitted in the usual way and instead use AJAX to submit the form. Here is an example:

```javascript
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  // AJAX code to submit the form
});
```
