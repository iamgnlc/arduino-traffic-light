import React, { Suspense, useReducer, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import { GiLed } from "react-icons/gi";
import LastAction from "./components/LastAction";
import Loading from "./components/Loading";

import { TOGGLE_LED, SET_BLINK, SET_ERROR } from "./actions.js";
import reducer from "./reducer.js";

const ToggleButtons = React.lazy(() => import("./components/ToggleButtons"));
const BlinkInterval = React.lazy(() => import("./components/BlinkInterval"));

const initialState = {
  danger: "off",
  warning: "off",
  success: "off",
  apiResponse: null,
  blinkInterval: "250",
};

const buildUrl = (color, status, value) => {
  if (!process.env.REACT_APP_SERVER_URL || !color || !status) return false;

  let url = `${
    process.env.REACT_APP_SERVER_URL
  }/${color.toLowerCase()}/${status.toLowerCase()}/`;

  if (value) url = `${url}${value}/`;

  return url;
};

const LedControl = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleLed = (color, status, value) => {
    if (!Array.isArray(status)) status = [status];

    status.forEach((status) => {
      const url = buildUrl(color, status, value);

      if (!url) return false;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let state = { type: TOGGLE_LED, apiResponse: data };
          if (data.code === 200) {
            state.color = color;
            state.status = status;
          }
          dispatch(state);
        })
        .catch((error) => {
          console.error("Error:", error);
          const state = {
            type: SET_ERROR,
            apiResponse: {
              code: 503,
              message: "Service not available",
            },
          };
          dispatch(state);
        });
    });
  };

  const setBlink = (value) => {
    dispatch({ type: SET_BLINK, value });
  };

  // Initialise board based on initial state.
  const initBoard = useCallback(() => {
    toggleLed("danger", ["stop", initialState["danger"]]);
    toggleLed("warning", ["stop", initialState["warning"]]);
    toggleLed("success", ["stop", initialState["success"]]);
  }, []);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  return (
    <Container>
      <Row>
        <Col className="py-3">
          <Card>
            <CardHeader>
              <h4 className="m-0 text-center">Arduino LED Control</h4>
            </CardHeader>
            <CardBody>
              <Row>
                <Suspense
                  fallback={
                    <Col>
                      <Loading />
                    </Col>
                  }
                >
                  <ToggleButtons
                    color="danger"
                    status={state["danger"]}
                    blinkInterval={state.blinkInterval}
                    toggleLed={toggleLed}
                  />
                  <ToggleButtons
                    color="warning"
                    status={state["warning"]}
                    blinkInterval={state.blinkInterval}
                    toggleLed={toggleLed}
                  />
                  <ToggleButtons
                    color="success"
                    status={state["success"]}
                    blinkInterval={state.blinkInterval}
                    toggleLed={toggleLed}
                  />
                  <BlinkInterval
                    blinkInterval={state.blinkInterval}
                    setBlink={setBlink}
                  />
                </Suspense>
              </Row>

              <LastAction
                color={state?.apiResponse?.color}
                status={state?.apiResponse?.status}
                message={state?.apiResponse?.message}
              />
            </CardBody>
            <CardFooter>
              <h6 className="m-0 text-muted text-center">
                <GiLed /> &copy; GNLC
              </h6>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(LedControl);
