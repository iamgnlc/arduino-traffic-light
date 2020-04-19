import {
  SET_COLOR,
  SET_COLORS,
  SET_INFO,
  SET_BLINK,
  SET_TRANSITION,
} from "./actions.js";

export default (state, action) => {
  switch (action.type) {
    case SET_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case SET_BLINK:
      return {
        ...state,
        blink: action.value,
      };
    case SET_TRANSITION:
      return {
        ...state,
        transition: action.value,
      };
    case SET_COLORS:
      return {
        ...state,
        red: action.result.color === "red" ? "on" : "off",
        yellow: action.result.color === "yellow" ? "on" : "off",
        green: action.result.color === "green" ? "on" : "off",
      };
    case SET_INFO:
      return {
        ...state,
        blink: action.result.blink,
        transition: action.result.transition,
      };
    default:
      return false;
  }
};
