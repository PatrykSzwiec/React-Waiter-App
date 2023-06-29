import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Modal} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTableRequest } from "../../../Redux/tablesRedux";
import  styles from "./SingleTable.module.scss";
import React, { useState } from 'react';


const SingleTable = ({ id, status, maxPeopleAmount }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteTableRequest(id));
    handleCloseModal();
  };
	return (
		<div>
			<Card>
        <Card.Body>
          <Row>
            <Col className="col-2">
              <Card.Title as='h3'>Table {id}</Card.Title>
            </Col>
            <Col className="col-3 d-flex align-items-center">
              <Card.Text as='p'><strong>Status: </strong>{status}</Card.Text>
            </Col>
            <Col className="col-3 d-flex align-items-center">
              <Card.Text as='p'><strong>Max People Amount: </strong>{maxPeopleAmount}</Card.Text>
            </Col>
            <Col className="col-4 d-flex justify-content-end">
              <div className={styles.button_container}>
                <Link to={"/table/" + id}>
                  <Button variant="primary">Show more</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={handleShowModal}
                  className={styles.delete_button}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This operation will completely remove this table from the app!
            <br />
            Are you sure you want to do that?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

		</div>
	)
};

export default SingleTable;