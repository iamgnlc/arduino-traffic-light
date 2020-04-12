const { Board } = require("johnny-five");

const board = new Board();

const TrafficLight = require("./TrafficLight");

// Ready.
board
  .on("ready", () => {
    let light;
    const interval = 5000;
    const transition = 1500;
    const trafficLight = new TrafficLight(transition);

    // Init.
    trafficLight.allOff();
    trafficLight.blinkYellow();
    setInterval(() => {
      switch (light) {
        default:
        case "red":
          trafficLight.toGreen();
          light = "green";
          break;
        case "green":
          trafficLight.toRed();
          light = "red";
          break;
      }
    }, interval);
  })
  // Exit.
  .on("exit", () => {
    const trafficLight = new TrafficLight();
    trafficLight.allOff();
  });
