import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';


function App() {
  return (
    <main>
      <Container>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Container>
    </main>
  );
}

export default App;
