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

const min = 100;

const Form = (props) => {
  const { label, value, callback, addOn } = props;

  let [valueState, setValueState] = useState(value);

  const setValue = () => {
    valueState = valueState < 100 ? 100 : valueState;
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
          value={valueState || min}
          type={type}
          min={min}
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
