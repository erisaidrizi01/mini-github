import { Dropdown } from "react-bootstrap";
import React from "react";
import "./style.css";

export default function PerPageDropdown(props) {
  return (
    <div className="d-flex">
      <label className="mx-3 label colo">Results per page:</label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {props.title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item value="5" onClick={props.selectPerPage}>
            5
          </Dropdown.Item>
          <Dropdown.Item value="10" onClick={props.selectPerPage}>
            10
          </Dropdown.Item>
          <Dropdown.Item value="15" onClick={props.selectPerPage}>
            15
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
