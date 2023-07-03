import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTableRequest } from "../../../Redux/tablesRedux";
import { useState } from "react";

const AddTable = () => {
  const [status, setStatus] = useState("Free");
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(1);
  const [tableNumber, setTableNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tables = useSelector((state) => state.tables);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if table number already exists
    const tableNumberExists = tables.some(
      (table) => table.tableNumber === tableNumber
  );

  if (tableNumberExists) {
    alert("This table number already exists");
    return;
  }
    dispatch(
      addTableRequest({
        tableNumber,
        status,
        peopleAmount,
        maxPeopleAmount,
        bill: 0,
      })
    );
    navigate("/");
  };

  const handlePeopleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= maxPeopleAmount) {
      setPeopleAmount(value);
    }
  };

  const handleMaxPeopleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value >= peopleAmount) {
      setMaxPeopleAmount(value);
    }
  };

  return (
    <>
      <h2>Add Table</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col sm={3}>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Busy">Busy</option>
              <option value="Free">Free</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Reserved">Reserved</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            <strong>Table Number:</strong>
          </Form.Label>
          <Col sm={2}>
            <Form.Control
              type="text"
              value={tableNumber}
              required
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setTableNumber(value);}}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col sm={1}>
            <Form.Control
              type="number"
              value={peopleAmount}
              onChange={handlePeopleAmountChange}
            />
          </Col>
          /
          <Col sm={1}>
            <Form.Control
              type="number"
              value={maxPeopleAmount}
              onChange={handleMaxPeopleAmountChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-2">
          <Col>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default AddTable;