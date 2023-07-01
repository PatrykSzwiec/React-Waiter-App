import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { fetchTables } from '../../../Redux/tablesRedux';
import { getAllTables } from "../../../Redux/tablesRedux";
import SingleTable from "../../features/SingleTable/SingleTable";
import { Link } from "react-router-dom";
import { Button, Row, Col} from "react-bootstrap";
import Loader from '../../features/Loader/Loader';

const Home = () => {

  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const isLoading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const sortedTables = tables.sort((a, b) => a.tableNumber - b.tableNumber);

  return (
    <>
      <Row>
        <Col className='d-flex justify-content-between'>
          <h1>All tables</h1>
          <Button className='mb-3' variant='outline-primary' as={Link} to={'/table/add'}>Add table</Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
    ) : (
      sortedTables.map((table) => <SingleTable key={table.id} {...table} />)
    )}
    </>
  );
};
export default Home;