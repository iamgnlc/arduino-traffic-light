require("dotenv").config();
require("colors");

const express = require("express");
const cors = require("cors");
const { Board } = require("johnny-five");

const board = new Board();
const ADDRESS = process.env.ADDRESS;
const PORT = process.env.PORT;

const TrafficLight = require("./TrafficLight");

const transition = 1500;
const blink = 500;

// Ready.
board.on("ready", () => {
  const app = express();
  const trafficLight = new TrafficLight(transition, blink);
  const allowedSet = ["transition", "blink"];
  let response;

  app.use(cors());

  // Set initial state
  trafficLight.yellow();

  app.get("/", (req, res) => {
    res.send("Server running");
  });

  // Info.
  app.get("/info", (req, res) => {
    response = {
      color: trafficLight.actualState,
      transition: trafficLight.transition,
      blink: trafficLight.blink,
      code: 200,
      message: "Success",
    };
    res.status(response.code).json(response);
  });

  // Color.
  app.get("/color/:color", async (req, res) => {
    const { color } = req.params;

    if (trafficLight.actualState === "transition") return false;
    // Color already active, no change.
    else if (trafficLight.actualState === color)
      response = { color, code: 200, message: "No change" };
    // Change color.
    else if (color && Object.keys(trafficLight.colors).includes(color)) {
      await trafficLight[color]();
      response = { color, code: 200, message: "Success" };
    }
    // Not allowed.
    else response = { code: 405, message: "Not Allowed" };

    res.status(response.code).json(response);
  });

  // Set.
  app.get("/set/:what/:value", (req, res) => {
    const { what, value = 100 } = req.params;

    // Set value.
    if (allowedSet.includes(what.toLocaleLowerCase()) && parseInt(value)) {
      func = "set" + what.charAt(0).toUpperCase() + what.slice(1);
      trafficLight[func](parseInt(value));
      response = { set: what, value: value, code: 200, message: "Success" };
    }
    // Not allowed.
    else response = { code: 405, message: "Not Allowed" };

    res.status(response.code).json(response);
  });

  // Not found.
  app.get("*", (req, res) => {
    response = { code: 404, message: "Not found" };
    res.status(response.code).json(response);
  });

  app.listen(PORT, ADDRESS, () => {
    // Turn the server on.
    console.log("Arduino Traffic Light".yellow);
    console.log(`Server running at http://${ADDRESS}:${PORT}/`.green);
  });
});

// Exit.
board.on("exit", () => {
  console.log("Shutting down traffic light...");
  const trafficLight = new TrafficLight();
  trafficLight.reset();
});
