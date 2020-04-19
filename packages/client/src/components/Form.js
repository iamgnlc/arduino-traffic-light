import React from "react";
import PropTypes from "prop-types";
import {
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const Form = (props) => {
  const { label, value, callback } = props;

  return (
    <Col xs={12}>
      <FormGroup className="d-flex justify-content-center align-items-center flex-column m-0">
        <Label>{label}</Label>
        <InputGroup className="w-75">
          <Input
            className="text-center"
            value={value || 100}
            type="number"
            min={100}
            onChange={(e) => callback(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>ms</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Col>
  );
};

Form.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  callback: PropTypes.func.isRequired,
};

export default React.memo(Form);
