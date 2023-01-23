class Simulation {
  constructor(canvas) {
    this.modules = [];
    this.connections = [];

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.windowOffset = { x: 100, y: 0 };
  }

  moveWindow(x, y) {
    this.windowOffset.x += x;
    this.windowOffset.y += y;
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
      connection.render(this.ctx, this.windowOffset)
    );
    this.modules.forEach((module) =>
      module.render(this.ctx, this.windowOffset)
    );
  }

  initClickEvent(module) {
    this.canvas.addEventListener("click", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (
        x > module.position.x + this.windowOffset.x &&
        x < module.position.x + module.size.w + this.windowOffset.x &&
        y > module.position.y + this.windowOffset.y &&
        y < module.position.y + module.size.h + this.windowOffset.y
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

  start() {
    this.render();
    this.initWindowMovement();
    this.initWindowResize();
  }
}

export default Simulation;
