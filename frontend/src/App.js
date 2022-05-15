import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import NavBar from './components/Navbar';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StickyFooter from './components/StickyFooter';
import Dashboard from './components/adminComponents/Dashboard';
import { useContext } from 'react';
import { Store } from './store';
import ProductsList from './components/adminComponents/ProductsList';
import UsersList from './components/adminComponents/UsersList';
import MenuList from './components/adminComponents/MenuList';
import Home from './components/Home';
import Products from './components/Products';
import Addadmin from './components/adminComponents/Addadmin';
import UserProfile from './components/UserProfile';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart, userInfo} = state ;
  
  return (
    <Router>
{      
    userInfo && userInfo.isAdmin 
      ? (

        <>
          <MenuList/>
          <Routes>
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/productslist' element={<ProductsList/>} />
            <Route exact path='/userslist' element={<UsersList/>} />
            <Route exact path='/addadmin' element={<Addadmin/>} />
          </Routes>
        </>
      )
      :(
        <>
          <NavBar/>
          <Routes>
            <Route exact path='/product/:slug' element={<ProductDetails/>} />
            <Route exact path='/cart' element={<Cart/>} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/products' element={<Products />} />
            <Route exact path='/userupdate' element={<UserProfile />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </>
      )}
      <StickyFooter/>
    </Router>
  );
}

export default App;
