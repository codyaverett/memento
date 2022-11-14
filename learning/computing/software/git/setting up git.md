# Setting up git

Anytime you are setting up git for the first time on a new system, you will want to set the global `user.name` and `user.email` properties so your commits are associated to your personal identity correctly.

```console
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

You can use `git amend` to fix old commits if you need to 