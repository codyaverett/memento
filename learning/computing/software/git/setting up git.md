---
name: Setting up Git
created: 2022-10-21T13:58:43-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---

# Setting up Git

Anytime you are setting up git for the first time on a new system, you will want to set the global `user.name` and `user.email` properties so your commits are associated to your personal identity correctly.

```console
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

You can use `git amend` to fix old commits if you need to 