import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTables } from '../../../Redux/tablesRedux';
import { useSelector } from "react-redux";
import { getAllTables } from "../../../Redux/tablesRedux";
import SingleTable from "../../features/SingleTable";
import { Link } from "react-router-dom";
import { Button, Row, Col} from "react-bootstrap";

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const tables = useSelector(getAllTables);

  return (
    <>
      <Row>
        <Col className='d-flex justify-content-between'>
          <h1>All tables</h1>
          <Button className='mb-3' variant='outline-primary' as={Link} to={'/table/add'}>Add table</Button>
        </Col>
      </Row>
      {tables.map((table) => <SingleTable key={table.id} {...table} /> )}
    </>
  );
};
export default Home;