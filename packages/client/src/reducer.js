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

export default (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case SET_COLORS:
      return {
        ...state,
        red: action.result.color === "red" ? "on" : "off",
        yellow: action.result.color === "yellow" ? "on" : "off",
        green: action.result.color === "green" ? "on" : "off",
      };
    case SET_BLINK_VALUE:
      return {
        ...state,
        serverUrl: action.serverUrl,
      };
    case SET_BASE_URL:
      return {
        ...state,
        baseUrl: action.value,
      };
    case SET_LENGTH_VALUE:
      return {
        ...state,
        length: action.value,
      };
    case SET_PROCESSING:
      return {
        ...state,
        isProcessing: action.value,
      };
    case SET_TRANSITION_VALUE:
      return {
        ...state,
        transition: action.value,
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
