import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button, Collapse, Table } from "reactstrap";
import { GoPlus, GoDash } from "react-icons/go";

const LastAction = (props) => {
  const { color, status, message } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button size="sm" color="primary" onClick={toggle}>
        {isOpen ? <GoDash /> : <GoPlus />} Last Action
      </Button>

      <Collapse isOpen={isOpen}>
        <Table className="my-4" bordered>
          <tbody>
            <tr>
              <th scope="row">Color</th>
              <td>
                <code>{color || "-"}</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>
                <code>{status || "-"}</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Message</th>
              <td>
                <code>{message || "-"}</code>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapse>
    </>
  );
};

LastAction.propTypes = {
  color: PropTypes.string,
  status: PropTypes.string,
  message: PropTypes.string,
};

export default React.memo(LastAction);
