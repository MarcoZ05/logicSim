import Module from "../Module.js";

class AND extends Module {
  constructor(position = { x: 0, y: 0 }, size = { x: 100, y: 100 }) {
    super("&", position, size, (input) => {
      this.powered = input.every((connection) => connection.powered === true);
    });
  }
}

export default AND;
