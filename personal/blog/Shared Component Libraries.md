---
name: Shared Component Libraries
created: 2023-02-27T21:42:42-06:00
updated: 2023-02-27T22:36:25-06:00
aliases: 
tags: components, modular
---
# Shared Component Libraries

I'm starting to believe that shared component libraries and coding standards to an extent stunt productivity and innovation.

```chat-gpt
It's understandable to have concerns about shared component libraries and coding standards potentially stifling innovation and productivity. While there are benefits to having standardized coding practices and reusable components, there can also be drawbacks.

One potential drawback is that having a shared component library can lead to code bloat, where the library becomes overly complex and difficult to navigate. This can make it harder to add new features or make changes to the codebase, which can slow down productivity.

Additionally, adhering to strict coding standards can sometimes lead to a lack of creativity and innovation in the development process. When developers are forced to follow a set of rules and guidelines, they may feel limited in their ability to explore new solutions or ideas.

That being said, there are also significant benefits to having shared component libraries and coding standards. Standardized coding practices can improve code quality, readability, and maintainability, which can ultimately lead to faster development times and fewer bugs. Reusable components can also save time and effort by reducing the need to write new code from scratch.

Ultimately, the key to balancing productivity and innovation with shared component libraries and coding standards is to find a balance between standardization and flexibility. It's important to have guidelines in place, but also allow for some degree of creativity and experimentation. It's also important to periodically review and update the guidelines to ensure they continue to meet the needs of the development team and the project as a whole.
```

It's of course good to see things from both sides.  I used to have a stronger opinion in the other direction.  I thought shared component libraries and centralized logic were the way to go.  My opinion has changed a bit since I started my new role.

Of course I do believe that in order for projects to be maintained effectively they will need some type of structure and coding conventions, but I don't think I enjoy using shared ui component libraries when they aren't maintained.  I suppose I have my own standards here, but  I need to also state that I believe that there are nothing but good intentions behind the code I've been reading.  It's a difficult conversation to have with a group of people whom you don't really know.  Any feedback you give may be taken as criticism.

I want to believe that there is a better way these things can be approached. 
Maybe I'll start a short list of ideas here.

- Components should not have visual styles imbedded in them
	- HTML and CSS should stay separate
- Components should not all exist in the same repository by force
	- This prevents innovation and can actually hold back progress and sharing
- Shared codebases have merging gates where you must convince others that your code is worthy
- Individuals should be allowed to host their own 
- Components should be pushed up to a shared and name-spaced repository
- Code forking should be allowed like it is in the real open source world
- Modular packages are generally simpler to understand and easier to replace
- It is simpler to update smaller modules than to maintain one big module
- Human Bias can prevent other humans from progressing
	- People can have opinions and people can be wrong
	- People with more organizational influence can be wrong
	- Anyone can be wrong, you know
	- I'd rather give someone my opinion and have them go around me than to stop them in their tracks and tell them that they are wasting their time.

At this point I don't know where I'm going with this one.  I just wish things were easier to change and work with instead of being stuck writing tests for some code you don't even have control of.
