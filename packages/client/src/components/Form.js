import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { FORM_MIN_VALUE } from "../config";

const Form = (props) => {
  const { label, value, callback, addOn } = props;

  let [valueState, setValueState] = useState(value);

  const setValue = () => {
    valueState = valueState < FORM_MIN_VALUE ? FORM_MIN_VALUE : valueState;
    callback(valueState);
  };

  const type = typeof value === "number" ? "number" : "string";

  return (
    <FormGroup className="d-flex justify-content-center align-items-center flex-column m-0">
      <Label>{label}</Label>
      <InputGroup className="w-100">
        <Input
          name="value"
          className="text-center"
          value={valueState || FORM_MIN_VALUE}
          type={type}
          min={FORM_MIN_VALUE}
          onChange={(e) => setValueState(e.target.value)}
        />
        {addOn && (
          <InputGroupAddon addonType="append">
            <InputGroupText>ms</InputGroupText>
          </InputGroupAddon>
        )}
        <InputGroupAddon addonType="append">
          <Button color="secondary" onClick={setValue}>
            Set
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  );
};

Form.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  callback: PropTypes.func.isRequired,
};

export default React.memo(Form);
