import React from "react";
import { render } from "@testing-library/react";
import Control from "./Control";

test("renders heading", () => {
  const { getByText } = render(<Control />);
  const linkElement = getByText(/Arduino Traffic Light Control/i);
  expect(linkElement).toBeInTheDocument();
});
