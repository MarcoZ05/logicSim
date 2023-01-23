import Connection from "./Connection.js";
import { AND, OR, LED, SWITCH, NOT, XOR, XNOR, NAND, NOR } from "./modules.js";

function test1(simulation) {
  const switch1 = new SWITCH({ x: 100, y: 100 }, { w: 100, h: 100 });
  const switch2 = new SWITCH({ x: 100, y: 300 }, { w: 100, h: 100 });
  const switch3 = new SWITCH({ x: 100, y: 500 }, { w: 100, h: 100 });

  const andGate1 = new AND({ x: 300, y: 200 }, { w: 100, h: 100 });

  const orGate1 = new OR({ x: 500, y: 300 }, { w: 100, h: 100 });

  const led1 = new LED({ x: 700, y: 300 }, { w: 100, h: 100 });

  const connection1 = new Connection(switch1, andGate1, [
    { x: 250, y: 150 },
    { x: 250, y: 250 },
  ]);
  const connection2 = new Connection(switch2, andGate1, [
    { x: 250, y: 350 },
    { x: 250, y: 250 },
  ]);
  const connection3 = new Connection(switch3, orGate1, [
    { x: 450, y: 550 },
    { x: 450, y: 350 },
  ]);
  const connection4 = new Connection(andGate1, orGate1, [
    { x: 450, y: 250 },
    { x: 450, y: 350 },
  ]);
  const connection5 = new Connection(orGate1, led1);

  simulation.addModule(andGate1);
  simulation.addModule(orGate1);
  simulation.addModule(switch1);
  simulation.addModule(switch2);
  simulation.addModule(switch3);
  simulation.addModule(led1);

  simulation.addConnection(connection1);
  simulation.addConnection(connection2);
  simulation.addConnection(connection3);
  simulation.addConnection(connection4);
  simulation.addConnection(connection5);
}

export default test1;
