let ID = 0;

class Module {
  constructor(
    name = "Module",
    position = { x: 0, y: 0 },
    size = { w: 100, h: 100 },
    inputProcess = () => {},
    clickProcess = () => {}
  ) {
    this.ID = ID++;
    this.name = name;

    this.position = position;
    this.size = size;

    this.output = [];
    this.input = [];

    this.inputProcess = inputProcess;
    this.clickProcess = clickProcess;

    this.powered = false;
  }

  addOutputConnection(connection) {
    this.output.push(connection);
  }

  addInputConnection(connection) {
    this.input.push(connection);
  }

  render(ctx) {
    if (this.powered) ctx.fillStyle = "#00ff00";
    else ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = this.size.h / 4 + "px Arial";
    ctx.fillText(
      this.name,
      this.position.x + this.size.w / 2,
      this.position.y + this.size.h / 2
    );
  }

  runInputProcess() {
    this.inputProcess(this.input, this.output);
    this.output.forEach((connection) => (connection.power(this.powered)));
  }

  runClickProcess() {
    this.clickProcess(this.input, this.output);
    this.output.forEach((connection) => (connection.power(this.powered)));
  }
}

export default Module;
