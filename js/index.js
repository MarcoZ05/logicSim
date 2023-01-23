import Simulation from "./Simulation.js";
import test1 from "./test1.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const simulation = new Simulation(canvas);

test1(simulation);

simulation.start();
