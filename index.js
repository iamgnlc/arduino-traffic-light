const { Board, Led } = require("johnny-five");

const board = new Board();

// Ready.
board
  .on("ready", () => {
    const leds = {
      green: new Led(11),
      yellow: new Led(12),
      red: new Led(13),
    };
    const interval = 5000;
    const transition = 1500;
    let light;

    // Turn all leds off.
    const allOff = () => {
      leds.green.stop().off();
      leds.yellow.stop().stop().off();
      leds.red.stop().off();
    };
    // Turn on red.
    const onlyRed = () => {
      leds.green.off();
      leds.yellow.stop().off();
      leds.red.on();
      light = "red";
    };
    // Turn on yellow.
    const onlyYellow = () => {
      leds.green.off();
      leds.yellow.stop().on();
      leds.red.off();
      light = "yellow";
    };
    // Blink yellow.
    const blinkYellow = () => {
      leds.green.off();
      leds.yellow.blink(450);
      leds.red.off();
    };
    // Turn on green.
    const onlyGreen = () => {
      leds.green.on();
      leds.yellow.stop().off();
      leds.red.off();
      light = "green";
    };
    // Transition to red.
    const toRed = () => {
      onlyYellow();
      setTimeout(() => {
        onlyRed();
      }, transition);
    };
    // Transition to green.
    const toGreen = () => {
      leds.red.on();
      leds.yellow.stop().on();
      setTimeout(() => {
        onlyGreen();
      }, transition);
    };

    // Init.
    allOff();
    blinkYellow();
    setInterval(() => {
      switch (light) {
        default:
        case "red":
          toGreen();
          break;
        case "green":
          toRed();
          break;
      }
    }, interval);
  })
  // Exit.
  .on("exit", () => {
    new Led(11).off();
    new Led(12).stop().off();
    new Led(13).off();
  });
