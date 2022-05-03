import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import NavBar from './components/Navbar';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:slug' element={<ProductDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
