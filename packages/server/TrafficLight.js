const { Led } = require("johnny-five");

class TrafficLight {
  constructor(transition = 1000, blink = 450) {
    this.transition = transition;
    this.blink = blink;
    this.actualState;
    this.colors = {
      green: new Led(11),
      yellow: new Led(12),
      red: new Led(13),
    };
  }
  // Turn on red.
  _onlyRed() {
    this.colors.green.off();
    this.colors.yellow.stop().off();
    this.colors.red.on();
  }
  // Turn on yellow.
  _onlyYellow() {
    this.colors.green.off();
    this.colors.yellow.stop().on();
    this.colors.red.off();
  }
  // Blink yellow.
  _blinkYellow() {
    this.colors.green.off();
    this.colors.yellow.blink(this.blink);
    this.colors.red.off();
  }
  // Turn on green.
  _onlyGreen() {
    this.colors.green.on();
    this.colors.yellow.stop().off();
    this.colors.red.off();
  }

  setTransition(transition) {
    this.transition = transition;
  }

  setBlink(blink) {
    this.blink = blink;
  }

  // Transition to red.
  red() {
    this._onlyYellow();
    setTimeout(() => {
      this._onlyRed();
      this.actualState = "red";
    }, this.transition);
  }
  // Transition to blinking yellow.
  yellow() {
    this._blinkYellow();
    this.actualState = "yellow";
  }
  // Transition to green.
  green() {
    this.colors.red.on();
    this.colors.yellow.stop().on();
    setTimeout(() => {
      this._onlyGreen();
      this.actualState = "green";
    }, this.transition);
  }

  // Lights off.
  reset() {
    this.colors.green.off();
    this.colors.yellow.stop().off();
    this.colors.red.off();
  }
  destructor() {
    this.reset();
  }
}

module.exports = TrafficLight;
