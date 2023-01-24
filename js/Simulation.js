class Simulation {
  constructor(canvas) {
    this.modules = [];
    this.connections = [];

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.windowOffset = { x: 100, y: 0 };
    this.windowZoom = 1;
  }

  moveWindow(x, y) {
    this.windowOffset.x += x / this.windowZoom;
    this.windowOffset.y += y / this.windowZoom;
    this.render();
  }

  zoomWindow(x, y, zoom) {
    this.windowZoom += zoom;
    this.render();
  }

  addModule(module) {
    this.modules.push(module);
    this.initClickEvent(module);
  }

  addConnection(connection) {
    this.connections.push(connection);

    connection.inputModule.addOutputConnection(connection);
    connection.outputModule.addInputConnection(connection);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.connections.forEach((connection) =>
      connection.render(this.ctx, this.windowOffset, this.windowZoom)
    );
    this.modules.forEach((module) =>
      module.render(this.ctx, this.windowOffset, this.windowZoom)
    );
  }

  initClickEvent(module) {
    this.canvas.addEventListener("click", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (
        x > (module.position.x + this.windowOffset.x) * this.windowZoom &&
        x <
          (module.position.x + this.windowOffset.x + module.size.w) *
            this.windowZoom &&
        y > (module.position.y + this.windowOffset.y) * this.windowZoom &&
        y <
          (module.position.y + this.windowOffset.y + module.size.h) *
            this.windowZoom
      ) {
        module.runClickProcess();
        module.runInputProcess();
        this.render();
      }
    });
  }

  initWindowResize() {
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.render();
    });
  }

  initWindowMovement() {
    let mouseDown = false;
    let lastMousePosition = { x: 0, y: 0 };

    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button !== 2) return;
      mouseDown = true;
      lastMousePosition.x = event.clientX;
      lastMousePosition.y = event.clientY;
    });

    this.canvas.addEventListener("mouseup", (event) => {
      if (event.button !== 2) return;
      mouseDown = false;
      lastMousePosition.x = 0;
      lastMousePosition.y = 0;
    });

    this.canvas.addEventListener("mousemove", (event) => {
      if (mouseDown) {
        const x = event.clientX;
        const y = event.clientY;

        this.moveWindow(x - lastMousePosition.x, y - lastMousePosition.y);

        lastMousePosition.x = x;
        lastMousePosition.y = y;
      }
    });

    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }

  initWindowZoom() {
    this.canvas.addEventListener("wheel", (event) => {
      event.preventDefault();

      const zoomDirection = Math.sign(event.deltaY);

      const x = event.clientX;
      const y = event.clientY;

      if (this.windowZoom < 0.2 && zoomDirection > 0) return;
      if (this.windowZoom > 1.5 && zoomDirection < 0) return;

      this.zoomWindow(1 / x, 1 / y, -zoomDirection / 10 * this.windowZoom);
      console.log(this.windowZoom);
    });
  }

  start() {
    this.render();
    this.initWindowMovement();
    this.initWindowResize();
    this.initWindowZoom();
  }
}

export default Simulation;
