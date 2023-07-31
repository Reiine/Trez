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
  const [cartVal, setCartVal] = useState(0)
  const [authToken, setAuthToken] = useState('');
  const [isLogin , setIsLogin ] =useState(false)
  const handleAuthToken= (val,val2) =>{
    setAuthToken(val)
    setIsLogin(val2)
  }

  const changeCartVal = () => {
    setCartVal(cartVal+1);
  }
  return (
    <Router>
      <Nav cartValue={cartVal}/>
      <div className="App">
        
        <Routes>
        
          <Route path="/" element={
            <>
              <UpperHome/>
              <HomeCard/>
            </>
          }/>

          <Route path="/shop/*" element={<Shop/>}/>
          <Route path="/items/:id" element={<Items onClick={setCartVal} authToken={authToken} />} />
          <Route path='/account/signup' element={<Signup/>}/>
          <Route path='/account/login' element={<Login handleAuthToken={handleAuthToken}/>}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/admin' element={<Admin/>}/>


        </Routes>
      </div>
      <Footer className="footer"/>
    </Router>
  );
}

export default App;
