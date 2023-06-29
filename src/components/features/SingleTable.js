import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

const SingleTable = ({ id, status, maxPeopleAmount }) => {

	return (
		<div>
			<Card>
        <Card.Body>
          <Row>
            <Col className="col-2">
              <Card.Title as='h3'>Table {id}</Card.Title>
            </Col>
            <Col className="col-4 d-flex align-items-center">
              <Card.Text as='p'><strong>Status: </strong>{status}</Card.Text>
            </Col>
            <Col className="col-4 d-flex align-items-center">
              <Card.Text as='p'><strong>Max People Amount: </strong>{maxPeopleAmount}</Card.Text>
            </Col>
            <Col className="col-2 d-flex justify-content-end">
              <Link to={'/table/' + id}><Button variant='primary'>Show more</Button></Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
		</div>
	)
};

export default SingleTable;