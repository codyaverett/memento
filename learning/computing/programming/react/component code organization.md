---
name: component code organization
created: 2023-05-16T18:55:33-05:00
updated: 2023-05-16T18:56:30-05:00
aliases: 
tags: 
---
# Component Code Organization

I like to separate my components into pages , layouts , and components, you might also have views that are less reusable groups of components.  Something like Brad Frost's atomic design principles (but don't overthink it!)

- Components are the smallest, most reusable pieces.  Changing these can impact several components at once

- Layouts are for reusable lay-outing components and I primarily would use render props to inject components into specific layout containers here.  These are strictly for containing other components and shouldn't contain any business logic.

- Views are a composite of components.  Views may have their own state that they manage.  A simple example of this could be a form.  A view may be a composite of a layout, some input fields, submit button, etc.

- Pages I think are fairly self explanatory, but these would coincide with your applications routes.  NextJS and Gatsby actually follow a page/directory structure with automatic routing which I like.

If you have snapshot tests for all your pages and views, you'll be able to easily see which components changing will impact various areas of your application.

Also, wrapping components in redux or some other state management will immediately make those components less reusable and harder to test.

I'd prefer prop drilling or using a localized context to importing redux stuff directly into isolated components.
