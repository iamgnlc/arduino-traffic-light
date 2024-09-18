import React from "react";
import { render } from "@testing-library/react";
import Control from "./Control";

test("renders heading", () => {
  const { getByText } = render(<Control />);
  const heading = getByText(/Arduino Traffic Light Control/i);
  expect(heading).toBeInTheDocument();
});
