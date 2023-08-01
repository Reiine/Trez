import './App.css';
import Nav from './components/Nav';
import UpperHome from './components/UpperHome';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HomeCard,CardComponent} from './components/HomeCard'
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Shop from './components/Shop';
import Items from './components/Items';
import {Login , Signup} from './components/Account';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';
import Admin from './components/Admin';

function App() {
  const [authToken, setAuthToken] = useState('');
  const [isLogin , setIsLogin ] = useState(false)
  const [cartAccess , setCartAccess] = useState(false);
  const setCartAccessed = (e) =>{
    setCartAccess(e);
  }

  const handleAuthToken= (val,val2) =>{
    setAuthToken(val)
    setIsLogin(val2)
  }

  return (
    <Router>
      <Nav authToken={authToken} cartAccess={cartAccess}/>
      <div className="App">
        <Routes>
        
          <Route path="/" element={
            <>
              <UpperHome/>
              <HomeCard/>
            </>
          }/>

          <Route path="/shop/*" element={<Shop/>}/>
          <Route path="/items/:id" element={<Items authToken={authToken} setCartAccessed={setCartAccessed} cartAccess={cartAccess}/>} />
          <Route path='/account/signup' element={<Signup/>}/>
          <Route path='/account/login' element={<Login handleAuthToken={handleAuthToken}/>}/>
          <Route path='/cart' element={<Cart isLogin={isLogin} authToken={authToken} />}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </div>
      <Footer className="footer"/>
    </Router>
  );
}

export default App;
