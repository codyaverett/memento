---
name: create a minimal react app with parcel
created: 2023-07-26T22:41:10-05:00
updated: 2023-07-26T23:06:59-05:00
aliases: 
tags: 
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

## 2. Create a New Directory Called "minimal_react"

- Open your terminal/command prompt.
- Navigate to the location where you want to create your new directory (for example, if you want to create it in your desktop, type cd Desktop).
- Create a new directory by typing mkdir minimal_react.

## 3. Open That Directory in Your terminal/command Prompt

- You can navigate into your new directory by typing cd minimal_react.

## 4. Initialize an Npm Package with Npm Init

- In your terminal, type `npm init --yes`. Execute. This will create a new package.json file in your directory.
- `package.json` is a file that contains metadata and configurations for your project and its dependencies. The `--yes` flag automatically fills out the prompts in the npm init command with default values.

## 5. Install Npm Dependencies for the Minimal Setup: `parcel, React, react-dom`

- Still in your terminal, type `npm install parcel-bundler react react-dom`. This will install these packages and add them as dependencies in your package.json file.

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

- Open your package.json file and locate the "scripts" section.
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

## 9. Bonus: Initialize a git repo

Let me know if you need further explanation or clarification on any of these steps.

Happy Coding!
