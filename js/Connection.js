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

  render(ctx, windowOffset = { x: 0, y: 0 }) {
    ctx.beginPath();
    if (this.powered) ctx.strokeStyle = "#00ff0090";
    else ctx.strokeStyle = "#ff000090";
    ctx.lineWidth = 5;
    
    
    ctx.moveTo(
      this.inputModule.position.x +
      this.inputModule.size.w / 2 +
      windowOffset.x,
      this.inputModule.position.y + this.inputModule.size.h / 2 + windowOffset.y
    );

    this.points.forEach((point) => {
      ctx.lineTo(point.x + windowOffset.x, point.y + windowOffset.y);
    });

    ctx.lineTo(
      this.outputModule.position.x +
      this.outputModule.size.w / 2 +
      windowOffset.x,
      this.outputModule.position.y +
      this.outputModule.size.h / 2 +
      windowOffset.y
    );

    ctx.stroke();
  }
}

export default Connection;
