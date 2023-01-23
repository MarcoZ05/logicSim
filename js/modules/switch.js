import Module from "../Module.js";

class SWITCH extends Module {
  constructor(position = { x: 0, y: 0 }, size = { x: 100, y: 100 }) {
    super(
      "",
      position,
      size,
      () => {},
      (input, output) => {
        this.powered = !this.powered;
      }
    );
  }
}

export default SWITCH;
