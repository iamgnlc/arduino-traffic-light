import React, { Suspense, useReducer, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  SET_COLOR,
  SET_COLORS,
  SET_INFO,
  SET_BLINK,
  SET_TRANSITION,
} from "./actions.js";
import reducer from "./reducer.js";

import Loading from "./components/Loading";
const Form = React.lazy(() => import("./components/Form"));

const initialState = {
  red: "off",
  yellow: "off",
  green: "off",
  blink: "",
  transition: "",
};

const baseUrl = process.env.REACT_APP_SERVER_URL;

const fetchUrl = (url) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const Control = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setBlink = async (value) => {
    const url = baseUrl + "/set/blink/" + value;
    const result = await fetchUrl(url);
    dispatch({ type: SET_BLINK, value: result.value });
  };

  const setTransition = async (value) => {
    const url = baseUrl + "/set/transition/" + value;
    const result = await fetchUrl(url);
    dispatch({ type: SET_TRANSITION, value: result.value });
  };

  const setColor = async (color) => {
    const url = baseUrl + "/color/" + color;
    const result = await fetchUrl(url);
    dispatch({ type: SET_COLOR, [result.color]: "on" });
    dispatch({ type: SET_COLORS, result });
  };

  const init = useCallback(async () => {
    const url = baseUrl + "/info";
    const result = await fetchUrl(url);
    dispatch({ type: SET_INFO, result });
    dispatch({ type: SET_COLORS, result });
  }, []);

  const getColor = () => {
    if (state.red === "on") return "red";
    if (state.yellow === "on") return "yellow";
    if (state.green === "on") return "green";
  };

  const toggle = () => {
    switch (getColor()) {
      case "red":
        return setColor("green");
      case "green":
        return setColor("red");
      default:
        return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      toggle();
    }, state.transition);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Container>
      <Row>
        <Col className="py-3">
          <Card>
            <CardHeader>
              <h4 className="m-0 text-center">Arduino Traffic Light Control</h4>
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
                  <Col xs={12} md={6} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("red")}
                      color="danger"
                      disabled={state.red === "on"}
                      outline={state.red === "on"}
                    >
                      Red
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("green")}
                      color="success"
                      disabled={state.green === "on"}
                      outline={state.green === "on"}
                    >
                      Green
                    </Button>
                  </Col>
                  <Col xs={12} md={{ size: 6, offset: 3 }} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("yellow")}
                      color="warning"
                      disabled={state.yellow === "on"}
                      outline={state.yellow === "on"}
                    >
                      Yellow
                    </Button>
                  </Col>
                  <Col xs={12} lg={6} className="mb-3">
                    <Form
                      label="Blink interval"
                      callback={setBlink}
                      value={Number(state.blink)}
                    />
                  </Col>
                  <Col xs={12} lg={6} className="mb-3">
                    <Form
                      label="Transition"
                      callback={setTransition}
                      value={Number(state.transition)}
                    />
                  </Col>
                </Suspense>
              </Row>
            </CardBody>
            <CardFooter>
              <h6 className="m-0 text-muted text-center">&copy; GNLC</h6>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(Control);
