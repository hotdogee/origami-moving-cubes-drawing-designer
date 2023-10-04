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
