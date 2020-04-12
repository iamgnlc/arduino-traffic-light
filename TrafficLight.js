const { Led } = require("johnny-five");

class TrafficLight {
  constructor(interval, transition = 1000, blink = 450) {
    this.interval = interval;
    this.transition = transition;
    this.blink = blink;
    this.nextState;
    this.leds = {
      green: new Led(11),
      yellow: new Led(12),
      red: new Led(13),
    };
  }
  // Turn on red.
  _onlyRed() {
    this.leds.green.off();
    this.leds.yellow.stop().off();
    this.leds.red.on();
  }
  // Turn on yellow.
  _onlyYellow() {
    this.leds.green.off();
    this.leds.yellow.stop().on();
    this.leds.red.off();
  }
  // Blink yellow.
  _blinkYellow() {
    this.leds.green.off();
    this.leds.yellow.blink(this.blink);
    this.leds.red.off();
  }
  // Turn on green.
  _onlyGreen() {
    this.leds.green.on();
    this.leds.yellow.stop().off();
    this.leds.red.off();
  }
  // Transition to red.
  _toRed() {
    this._onlyYellow();
    setTimeout(() => {
      this._onlyRed();
    }, this.transition);
  }
  // Transition to green.
  _toGreen() {
    this.leds.red.on();
    this.leds.yellow.stop().on();
    setTimeout(() => {
      this._onlyGreen();
    }, this.transition);
  }
  // Lights off.
  reset() {
    this.leds.green.off();
    this.leds.yellow.stop().off();
    this.leds.red.off();
  }
  start() {
    // Init.
    this.reset();
    this._blinkYellow();
    setInterval(() => {
      switch (this.nextState) {
        default:
        case "red":
          this._toGreen();
          this.nextState = "green";
          break;
        case "green":
          this._toRed();
          this.nextState = "red";
          break;
      }
    }, this.interval);
  }
  destructor() {
    this.reset();
  }
}

module.exports = TrafficLight;
