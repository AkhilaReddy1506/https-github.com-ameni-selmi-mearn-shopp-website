import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import NavBar from './components/Navbar';
import Cart from './components/Cart';
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:slug' element={<ProductDetails/>} />
        <Route exact path='/cart' element={<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
