import Module from "../Module.js";

class XOR extends Module {
  constructor(position = { x: 0, y: 0 }, size = { x: 100, y: 100 }) {
    super("≠", position, size, (input) => {
      this.powered =
        input.filter((connection) => connection.powered === true).length === 1;
    });
  }
}

export default XOR;
