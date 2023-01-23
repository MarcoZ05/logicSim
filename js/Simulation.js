import Module from "./Module.js";
import Connection from "./Connection.js";

class Simulation {
  constructor(canvas) {
    this.modules = [];
    this.connections = [];

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
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
    this.connections.forEach((connection) => connection.render(this.ctx));
    this.modules.forEach((module) => module.render(this.ctx));
  }

  resetConnectionPower() {
    this.connections.forEach((connection) => (connection.powered = false));
  }

  initClickEvent(module) {
    this.canvas.addEventListener("click", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (
        x > module.position.x &&
        x < module.position.x + module.size.w &&
        y > module.position.y &&
        y < module.position.y + module.size.h
      ) {
        module.runClickProcess();
        module.runInputProcess();
        this.render();
      }
    });
  }
}

export default Simulation;
