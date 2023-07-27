---
name: create a minimal react app with parcel
created: 2023-07-26T22:41:10-05:00
updated: 2023-07-26T22:41:51-05:00
aliases: 
tags: 
---
# create a minimal react app with parcel

## 1. Install nodejs and npm
- Go to the [official Node.js website](https://nodejs.org/en/download/) and download the installer based on your operating system.
- Install Node.js and npm from the installer (npm is included in the Node.js installation).
- To verify the installation, open your terminal/command prompt and type the following commands:
	- `node -v` This should display the version of Node.js installed on your system.
	- `npm -v` This should display the version of npm installed on your system.

## 2. Create a new directory called "minimal_react"

- Open your terminal/command prompt.
- Navigate to the location where you want to create your new directory (for example, if you want to create it in your desktop, type cd Desktop).
- Create a new directory by typing mkdir minimal_react.

## 3. Open that directory in your terminal/command prompt

- You can navigate into your new directory by typing cd minimal_react.

## 4. Initialize an npm package with npm init

- In your terminal, type `npm init --yes`. Execute. This will create a new package.json file in your directory.
- `package.json` is a file that contains metadata and configurations for your project and its dependencies. The `--yes` flag automatically fills out the prompts in the npm init command with default values.

## 5. Install npm dependencies for the minimal setup: `parcel, react, react-dom`

- Still in your terminal, type `npm install parcel-bundler react react-dom`. This will install these packages and add them as dependencies in your package.json file.

## 6. Create an index.html with boilerplate and index.js with basic react components

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

## 7. Add a npm script to start parcel against the index.html

- Open your package.json file and locate the "scripts" section.
- Add a new entry for "start" with the value "parcel index.html". It should look something like this:
  
```json
"scripts": {
    "start": "parcel index.html"
}
```

## 8. Start and see how it updates with HMR enabled

- In your terminal and from within your project directory, type `npm start`. Execute. This will start the Parcel bundler, which will compile your code and start a local development server.
- You can access your app by going to `localhost:1234` in your web browser.
- Parcel has Hot Module Replacement (HMR) enabled by default, so if you make changes to your code, those changes will automatically be reflected in your browser without you having to manually refresh the page.



## 9. Begin experimenting
Let me know if you need further explanation or clarification on any of these steps.