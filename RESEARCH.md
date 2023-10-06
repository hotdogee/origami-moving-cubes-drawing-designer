# React

- react-canvas-draw
  - https://github.com/embiem/react-canvas-draw
  - https://embiem.github.io/react-canvas-draw/
- react-sketch-canvas
  - https://github.com/vinothpandian/react-sketch-canvas
  - https://vinoth.info/react-sketch-canvas/
- Excalidraw
  - https://github.com/excalidraw/excalidraw
- tldraw
  - https://github.com/tldraw/tldraw

# Old School

- https://code.tutsplus.com/how-to-create-a-web-based-drawing-application-using-canvas--net-14288t/attachment

  - Uses
    canvas.addEventListener("mousedown", ev_canvas, false);
    canvas.addEventListener("mousemove", ev_canvas, false);
    canvas.addEventListener("mouseup", ev_canvas, false);

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics

  - Uses
    document.addEventListener("mousemove", (e) => {
    curX = e.pageX;
    curY = e.pageY;
    });
    canvas.addEventListener("mousedown", () => (pressed = true));
    canvas.addEventListener("mouseup", () => (pressed = false));
    requestAnimationFrame(draw);

- https://www.programonaut.com/create-a-drawing-app-with-html-and-javascript/

  - context.imageSmoothingEnabled = true;
  - function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

    return {
    x: (evt.clientX - rect.left) _ scaleX,
    y: (evt.clientY - rect.top) _ scaleY
    }
    }

- Paint App using ReactJS

  - https://www.geeksforgeeks.org/paint-app-using-reactjs/
  - No external libs

- How to implement canvas in React

  - https://www.educative.io/answers/how-to-implement-canvas-in-react
  - npm i react-canvas-paint

- How to Build a Freehand Drawing Using React
  - https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
  - Does not use <canvas>, instead builds SVG

# Use drawImage

https://www.w3schools.com/jsref/canvas_drawimage.asp

- context.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height)

# Use Canvas API

https://www.w3schools.com/jsref/api_canvas.asp

# Animations

- CSS Animarions with custom @keyframes

# Examples

- https://github.com/tldraw/tldraw

# Responsive Design

- https://www.tldraw.com/s/v2_c_fJvKdeofc9k6eNmDtQHvk?viewport=0%2C0%2C1714%2C1227&page=page%3AnMyM8REMxb8ajBuTqvSsm

# Mobile touch support

- Replace mouse events with pointer events
  ```js
  onMouseDown = { startDrawing }
  onMouseUp = { endDrawing }
  onMouseOut = { endDrawing }
  onMouseMove = { draw }
  ```
  ```js
  onPointerDown = { startDrawing }
  onPointerUp = { endDrawing }
  onPointerOut = { endDrawing }
  onPointerMove = { draw }
  ```
- Added `touch-none` class to UI elements you want to prevent the default dragging behavior:
  - canvas
  - range slider

# Maskable Icons

The idea is to keep the core section of our icon designs within a safe area, which is a central portion of the image with a radius equal to 40% of the minimum icon width and height.
The icon inside the safe area is guaranteed to be displayed independently from the rendered shape, while outside of this portion, it might get cropped, according to which icon shape is used.

- https://maskable.app/editor

# Research promising tech stacks

- Blitz.js
- https://github.com/shadowwalker/next-pwa/
  - AppDir fork
    https://github.com/DuCanhGH/next-pwa
    https://ducanh-next-pwa.vercel.app/docs
- https://github.com/i18next/next-i18next
