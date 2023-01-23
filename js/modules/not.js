import Module from "../Module.js";


class NOT extends Module {
  constructor(position = { x: 0, y: 0 }, size = { x: 100, y: 100 }) {
    super("!", position, size, (input) => {
      this.powered = !input[0].powered;
    });
  }
}

export default NOT;