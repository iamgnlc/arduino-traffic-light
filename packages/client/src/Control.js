import React, {
  Suspense,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Container,
  Collapse,
  Row,
  Col,
} from "reactstrap";

import {
  SET_ACTIVE_COLOR,
  SET_COLORS,
  SET_INFO,
  SET_BASE_URL,
  SET_PROCESSING,
  SET_LENGTH_VALUE,
  SET_BLINK_VALUE,
  SET_TRANSITION_VALUE,
} from "./actions.js";
import reducer from "./reducer.js";

import { BsGear } from "react-icons/bs";

import { DEFAULT_LENGHT } from "./config";
import Loading from "./components/Loading";
const Form = React.lazy(() => import("./components/Form"));

const initialState = {
  baseUrl: process.env.REACT_APP_SERVER_URL,
  red: "off",
  yellow: "off",
  green: "off",
  blink: 0,
  transition: 0,
  length: DEFAULT_LENGHT,
};

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
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const setLength = (value) => {
    dispatch({ type: SET_LENGTH_VALUE, value });
  };

  const setBlink = async (value) => {
    const url = state.baseUrl + "/set/blink/" + value;
    const result = await fetchUrl(url);
    dispatch({ type: SET_BLINK_VALUE, value: result.value });
  };

  const setTransition = async (value) => {
    const url = state.baseUrl + "/set/transition/" + value;
    const result = await fetchUrl(url);
    dispatch({ type: SET_TRANSITION_VALUE, value: result.value });
  };

  const setBaseUrl = async (value) => {
    dispatch({ type: SET_BASE_URL, value });
  };

  const setColor = async (color) => {
    const url = state.baseUrl + "/color/" + color;
    dispatch({ type: SET_PROCESSING, value: true });
    const result = await fetchUrl(url);
    dispatch({ type: SET_PROCESSING, value: false });
    dispatch({ type: SET_ACTIVE_COLOR, [result.color]: "on" });
    dispatch({ type: SET_COLORS, result });
  };

  const getColor = () => {
    if (state.red === "on") return "red";
    if (state.yellow === "on") return "yellow";
    if (state.green === "on") return "green";
  };

  const toggleColor = () => {
    switch (getColor()) {
      case "red":
        return setColor("green");
      case "green":
        return setColor("red");
      default:
        return false;
    }
  };

  const init = useCallback(async () => {
    const url = state.baseUrl + "/info";
    const result = await fetchUrl(url);
    console.log(result);
    dispatch({ type: SET_COLORS, result });
    dispatch({ type: SET_INFO, result });
  }, [state.baseUrl]);

  useEffect(() => {
    const interval = setInterval(() => {
      toggleColor();
    }, state.length);
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
              <Suspense
                fallback={
                  <Col>
                    <Loading />
                  </Col>
                }
              >
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("red")}
                      color="danger"
                      disabled={state.red === "on" || state.isProcessing}
                      outline={state.red === "on"}
                    >
                      Stop
                    </Button>
                  </Col>
                  <Col xs={12} md={6} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("green")}
                      color="success"
                      disabled={state.green === "on" || state.isProcessing}
                      outline={state.green === "on"}
                    >
                      Go
                    </Button>
                  </Col>
                  <Col xs={12} md={{ size: 6, offset: 3 }} className="mb-3">
                    <Button
                      block
                      size="lg"
                      onClick={() => setColor("yellow")}
                      color="warning"
                      disabled={state.yellow === "on" || state.isProcessing}
                      outline={state.yellow === "on"}
                    >
                      Standby
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="text-center">
                    <Button color="link" onClick={toggle}>
                      <BsGear /> Config
                    </Button>
                  </Col>
                </Row>
                <Collapse isOpen={isOpen}>
                  {isOpen && (
                    <Suspense fallback={<Loading />}>
                      <hr />
                      <Row>
                        <Col
                          xs={12}
                          lg={{ size: 4, offset: 4 }}
                          className="mb-3"
                        >
                          <Form
                            label="Server URL"
                            callback={setBaseUrl}
                            value={state.baseUrl}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                          <Form
                            label="Stop/Go delay"
                            callback={setLength}
                            value={Number(state.length)}
                            addOn="ms"
                          />
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                          <Form
                            label="Yellow transition"
                            callback={setTransition}
                            value={Number(state.transition)}
                            addOn="ms"
                          />
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                          <Form
                            label="Standby blink interval"
                            callback={setBlink}
                            value={Number(state.blink)}
                            addOn="ms"
                          />
                        </Col>
                      </Row>
                    </Suspense>
                  )}
                </Collapse>
              </Suspense>
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
