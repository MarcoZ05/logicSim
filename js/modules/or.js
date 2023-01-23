import Module from "../Module.js";

class OR extends Module {
  constructor(position = { x: 0, y: 0 }, size = { x: 100, y: 100 }) {
    super("≥1", position, size, (input) => {
      this.powered = input.some((connection) => connection.powered === true);
    });
  }
}

export default OR;
