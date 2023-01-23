class Connection {
  constructor(inputModule, outputModule, fixPoints = []) {
    this.inputModule = inputModule;
    this.outputModule = outputModule;
    this.points = fixPoints;
    this.powered = false;
  }

  power(value) {
    this.powered = value;
    this.outputModule.runInputProcess();
  }

  render(ctx) {
    ctx.beginPath();
    if (this.powered) ctx.strokeStyle = "#00ff00";
    else ctx.strokeStyle = "#ff0000";

    ctx.moveTo(
      this.inputModule.position.x + this.inputModule.size.w / 2,
      this.inputModule.position.y + this.inputModule.size.h / 2
    );

    this.points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.lineTo(
      this.outputModule.position.x + this.outputModule.size.w / 2,
      this.outputModule.position.y + this.outputModule.size.h / 2
    );

    ctx.stroke();
  }
}

export default Connection;
