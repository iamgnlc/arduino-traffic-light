const { Board } = require("johnny-five");

const TrafficLight = require("./TrafficLight");

const board = new Board();

// Ready.
board
  .on("ready", () => {
    const interval = 5000;
    const transition = 1500;
    const trafficLight = new TrafficLight(interval, transition);

    // Init.
    trafficLight.start();
  })
  // Exit.
  .on("exit", () => {
    const trafficLight = new TrafficLight();
    trafficLight.reset();
  });
