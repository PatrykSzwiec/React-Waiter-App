import { useSelector } from "react-redux";
import { getAllTables } from "../../../Redux/tablesRedux";
import SingleTable from "../../features/SingleTable";

const Home = () => {

  const tables = useSelector(getAllTables);
  console.log(tables);

  return (
    <div>
      <h1>All tables</h1>
      {tables.map((table) => <SingleTable key={table.id} {...table} /> )}
    </div>
  );
};
export default Home;