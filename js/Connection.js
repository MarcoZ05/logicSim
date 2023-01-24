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

  render(ctx, windowOffset = { x: 0, y: 0 }, windowZoom = 1) {
    ctx.beginPath();
    if (this.powered) ctx.strokeStyle = "#00ff0090";
    else ctx.strokeStyle = "#ff000090";
    ctx.lineWidth = 5 * windowZoom;

    ctx.moveTo(
      (this.inputModule.position.x +
        this.inputModule.size.w / 2 +
        windowOffset.x) *
        windowZoom,
      (this.inputModule.position.y +
        this.inputModule.size.h / 2 +
        windowOffset.y) *
        windowZoom
    );

    this.points.forEach((point) => {
      ctx.lineTo(
        (point.x + windowOffset.x) * windowZoom,
        (point.y + windowOffset.y) * windowZoom
      );
    });

    ctx.lineTo(
      (this.outputModule.position.x +
        this.outputModule.size.w / 2 +
        windowOffset.x) *
        windowZoom,
      (this.outputModule.position.y +
        this.outputModule.size.h / 2 +
        windowOffset.y) *
        windowZoom
    );

    ctx.stroke();
  }
}

export default Connection;
