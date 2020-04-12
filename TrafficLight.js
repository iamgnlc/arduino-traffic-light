const { Led } = require("johnny-five");

class TrafficLight {
  constructor(transition = 1000, blink = 450) {
    this.transition = transition;
    this.blink = blink;
    this.leds = {
      green: new Led(11),
      yellow: new Led(12),
      red: new Led(13),
    };
  }
  // Lights off.
  allOff() {
    this.leds.green.stop().off();
    this.leds.yellow.stop().off();
    this.leds.red.stop().off();
  }
  // Turn on red.
  onlyRed() {
    this.leds.green.off();
    this.leds.yellow.stop().off();
    this.leds.red.on();
  }
  // Turn on yellow.
  onlyYellow() {
    this.leds.green.off();
    this.leds.yellow.stop().on();
    this.leds.red.off();
  }
  // Blink yellow.
  blinkYellow() {
    this.leds.green.off();
    this.leds.yellow.blink(this.blink);
    this.leds.red.off();
  }
  // Turn on green.
  onlyGreen() {
    this.leds.green.on();
    this.leds.yellow.stop().off();
    this.leds.red.off();
  }
  // Transition to red.
  toRed() {
    this.onlyYellow();
    setTimeout(() => {
      this.onlyRed();
    }, this.transition);
  }
  // Transition to green.
  toGreen() {
    this.leds.red.on();
    this.leds.yellow.stop().on();
    setTimeout(() => {
      this.onlyGreen();
    }, this.transition);
  }
}

module.exports = TrafficLight;
