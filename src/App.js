import "./App.css";
import Nav from "./components/Nav";
import UpperHome from "./components/UpperHome";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomeCard, CardComponent } from "./components/HomeCard";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shop from "./components/Shop";
import Items from "./components/Items";
import { Login, Signup } from "./components/Account";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";
import Admin from "./components/Admin";
import AccountInfo from "./components/AccountInfo";
import BillingPage from "./components/BillingPage";
import DirectBuy from "./components/DirectBuy";
import UserOrders from "./components/UserOrders";

function App() {
  const [authToken, setAuthToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [cartAccess, setCartAccess] = useState(false);
  const [user,setUser] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [billing, setBilling] = useState(0);

  const getUser = (e) =>{
    setUser(e);
  }

  const goToBilling = (e) => {
    setBilling(e);
  };
  useEffect(() => {
  }, [billing]);

  const updateCartItemCount = (count) => {
    setCartItemCount(count);
  };
  const setCartAccessed = (e) => {
    setCartAccess(e);
  };

  const handleAuthToken = (val, val2) => {
    setAuthToken(val);
    setIsLogin(val2);
  };

  return (
    <Router>
      <Nav
        authToken={authToken}
        cartAccess={cartAccess}
        cartItemCount={cartItemCount}
        setCartItemCount={updateCartItemCount}
      />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UpperHome />
                <HomeCard />
              </>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:search" element={<Shop />} />
          <Route
            path="/items/:id"
            element={
              <Items
                authToken={authToken}
                setCartAccessed={setCartAccessed}
                cartAccess={cartAccess}
              />
            }
          />
          {isLogin ? (
            <Route path="/account/*" element={<AccountInfo />} />
          ) : (
            <>
              <Route path="/account/signup" element={<Signup />} />
              <Route
                path="/account/login"
                element={<Login handleAuthToken={handleAuthToken} />}
              />
            </>
          )}
          <Route
            path="/cart"
            element={
              <Cart
                isLogin={isLogin}
                authToken={authToken}
                updateCartItemCount={updateCartItemCount}
                goToBilling={goToBilling}
                getUser={getUser}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/billing"
            element={<BillingPage billing={billing} authToken={authToken} user={user}/>}
          />
          <Route path="/billing/:id/:quantity" element={<DirectBuy authToken={authToken}/>} />
          <Route path="/account/your-orders" element={<UserOrders/>} />
          <Route path="/account/your-orders/:boolean/:orderId" element={<UserOrders/>} />

        </Routes>
      </div>
      <Footer className="footer" />
    </Router>
  );
}

export default App;
