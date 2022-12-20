---
name: 3d Cube with Js
created: 2022-12-19T18:51:48-06:00
updated: 2022-12-19T18:54:29-06:00
aliases: 
tags: 3d, webgl
---
# 3d Cube with Js

To create a 3D cube in JavaScript, you can use the WebGL API (Web Graphics Library). WebGL is a cross-platform API that allows you to create 3D graphics in a web browser using JavaScript.

Here is an example of how you can create a 3D cube in JavaScript using WebGL:

First, create a canvas element in your HTML file where the 3D cube will be rendered:

```html
<canvas id="myCanvas"></canvas>
```

In your JavaScript file, get a reference to the canvas element and create a WebGL rendering context:

```javascript
const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');
```

Set up the viewport, which specifies the portion of the canvas that will be used for rendering:
```javascript
gl.viewport(0, 0, canvas.width, canvas.height);
```

Create a vertex buffer and bind it to the WebGL context:

```javascript
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
```

Define the vertices of the cube as an array of coordinates:

```javascript
const vertices = [
  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,

  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,

  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,

  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,

  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,

  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
];
```

Load the vertices into the vertex buffer:

```javascript
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices));
```



