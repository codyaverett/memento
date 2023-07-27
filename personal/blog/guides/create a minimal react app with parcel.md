---
name: Create a Minimal React App with Parcel
created: 2023-07-26T22:41:10-05:00
updated: 2023-07-26T23:53:06-05:00
aliases: 
tags: minimalist
---
# Create a Minimal React App with Parcel

This is a minimal react project pattern I've pulled together.  It's quick and performant out of the box and you will set it up from the ground up.

After following these instructions, you will have created a react single page application that you can host from any standard web server.  You can use this as a starting template for any future react project you make.

## 1. Install Nodejs and Npm
- Go to the [official Node.js website](https://nodejs.org/en/download/) and download the installer based on your operating system.
- Install Node.js and npm from the installer (npm is included in the Node.js installation).
- To verify the installation, open your terminal/command prompt and type the following commands:
	- `node -v` This should display the version of Node.js installed on your system.
	- `npm -v` This should display the version of npm installed on your system.

> NOTE: I recommend using [`pnpm`](https://pnpm.io/) instead of npm usually, but It's good to be familiar with both. 
- You can install pnpm with npm by running `npm -g install pnpm`
- These instructions will continue to use npm in the inital setup, but if you want to try using pnpm instead, just try using `pnpm` instead of `npm` for any of the commands you run below.

## 2. Create a New Directory Called "minimal_react"

- Open your terminal/command prompt.
- Navigate to the location where you want to create your new directory (for example, if you want to create it in your desktop, type cd Desktop).
- Create a new directory by typing `mkdir minimal_react`. Execute.

## 3. Open That Directory in Your terminal/command Prompt

- You can navigate into your new directory by typing cd minimal_react.

## 4. Initialize an Npm Package with Npm Init

- In your terminal, type `npm init --yes`. Execute. This will create a new package.json file in your directory.
- `package.json` is a file that contains metadata and configurations for your project and its dependencies. The `--yes` flag automatically fills out the prompts in the npm init command with default values.

## 5. Install Npm Dependencies for the Minimal Setup: `parcel, React, react-dom`

- Still in your terminal, type `npm install parcel react react-dom`. This will install these packages and add them as dependencies in your package.json file.

## 6. Create an index.html with Boilerplate and index.js with Basic React Components

- Create an index.html file in your directory and add the following boilerplate

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minimal React</title>
</head>
<body>
    <div id="app"></div>
    <script src="./index.js"></script>
</body>
</html>
```

- Create an index.js file in your directory and add the following basic React code:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
    return <h1>Hello, world!</h1>;
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## 7. Add a Npm Script to Start Parcel Against the index.html

- Open your `package.json` file and locate or add the "scripts" section.
- Add a new entry for "start" with the value "parcel index.html". It should look something like this:
  
```json
"scripts": {
    "start": "parcel index.html"
}
```

## 8. Start and See How it Updates with HMR Enabled

- In your terminal and from within your project directory, type `npm start`. Execute. This will start the Parcel bundler, which will compile your code and start a local development server.
- You can access your app by going to `localhost:1234` in your web browser.
- Parcel has Hot Module Replacement (HMR) enabled by default, so if you make changes to your code, those changes will automatically be reflected in your browser without you having to manually refresh the page.
- Any updates you make to your source files will automatically be reflected in the browser after you save changes.

## 9. Bonus: Initialize a Git Repo

It's important to have a backup and history of your source code.  Having this will enable you to branch and experiment with different changes.  It's also the main tool we will use to collaborate and share changes with other software developers.  Software development in the real world is a team sport.

### 9.1 Install Git

- If you haven't installed Git on your machine yet, you can download it from the [official Git website](https://git-scm.com/downloads). Download the version suitable for your operating system and install it.
  
### 9.2 Check Git Version

- Open Command Prompt and type `git --version`. This should display the version of Git installed on your system, which confirms that the installation was successful.

### 9.3 Navigate to Your Project Directory

- If you're not already in your project directory (minimal_react), navigate to it using Command Prompt. You can do this with a command similar to `cd path\to\your\project`.
- note: `cd` is the `current directory` program.  It changes the current directory to the path you specify.

### 9.4 Initialize Git

- Once you're in your project directory, initialize Git by typing `git init` in your Command Prompt. This creates a new Git repository in your current directory. You should see a message like `"Initialized empty Git repository in path/to/your/project/.git/"`.

### 9.5 Create a .gitignore File (optional but HIGHLY recommended)

- It's often helpful to create a `.gitignore` file at the root of your project to specify files or directories that you don't want Git to track. This is especially useful for ignoring `node_modules`, which you typically don't want to include in your repository. 
- PLEASE DO NOT EVER commit a `node_modules` directory to a git repo.
- You can create a `.gitignore` file in your text editor and add entries like `node_modules/` to it.
- Here is [an example nodejs oriented .gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore)

### 9.6 First Commit

- Now you can make your first commit. First, add all your files to the staging area with `git add .`.
- Then, commit these changes with `git commit -m "Initial commit"`. The -m flag allows you to add a message describing the commit.  "Initial commit" in this case.  You should try to commit independent changes often with enough description so you can easily follow the commit history.
- If you have a remote repository set up somewhere, like on github.com you can `git push` the branches and changes there for safe keeping.

## Thanks for Playing

Let me know if you need further explanation or clarification on any of these steps.

Happy Coding!
