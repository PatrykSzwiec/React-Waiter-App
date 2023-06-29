import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getTableById, editTableRequest } from "../../../Redux/tablesRedux";
import { useState, useEffect } from "react";
import { fetchTables } from "../../../Redux/tablesRedux";
const Table = () => {

    const { id } = useParams();
    const tableData = useSelector((state) => getTableById(state, id));

    const [status, setStatus] = useState();
    const [peopleAmount, setPeopleAmount] = useState();
    const [maxPeopleAmount, setMaxPeopleAmount] = useState();
    const [bill, setBill] = useState();

    useEffect(() => {
      if (tableData) {
        setStatus(tableData.status);
        setPeopleAmount(tableData.peopleAmount);
        setMaxPeopleAmount(tableData.maxPeopleAmount);
        setBill(tableData.bill);
      }
    }, [tableData]);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchTables()), [dispatch]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(editTableRequest({ status, peopleAmount, maxPeopleAmount, bill, id }));
      navigate('/');
    };

    return (
        <>
          <h2>Table {id}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label as='legend' column sm={1}>
              <strong>Status:</strong>
              </Form.Label>
              <Col sm={3}>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value='Busy'>Busy</option>
                  <option value='Free'>Free</option>
                  <option value='Cleaning'>Cleaning</option>
                  <option value='Reserved'>Reserved</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={1}>
                <strong>People:</strong>
              </Form.Label>
              <Col sm={1}>
                <Form.Control type='number' value={peopleAmount} onChange={(e) => setPeopleAmount(e.target.value)} />
              </Col>
              /
              <Col sm={1}>
                <Form.Control type='number' value={maxPeopleAmount} onChange={(e) => setMaxPeopleAmount(e.target.value)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={1}>
              <strong>Bill:</strong>
              </Form.Label>
              <Col sm={2}>
                <Row>
                  <Col sm={1}>$</Col>
                  <Col sm={6}>
                    <Form.Control type='number' value={status === "Busy" ? bill : 0} onChange={(e) => setBill(e.target.value)}/>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
              <Col>
                <Button type='submit' variant='primary'>Update</Button>
              </Col>
            </Form.Group>
          </Form>
        </>
    );
};

export default Table;