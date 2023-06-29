import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import Table from './components/pages/Table/Table';
import AddTable from "./components/pages/AddTable/AddTable";

function App() {
  return (
    <main>
      <Container>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="/table/add" element={<AddTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Container>
    </main>
  );
}

export default App;
