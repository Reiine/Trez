import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trezlogo from '../components/images/trezlogo.png';
import shoppingCart from '../components/images/sc.png';
import searchimg from './images/search.png';
import accimg from './images/acc.png';
import axios from 'axios';
import { numberCartItems } from './apiutils/apiUtils';

function Nav({ authToken, cartAccess }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (authToken) {
      async function fetchCartItems() {
        console.log(authToken,cartAccess)
        try {
          const response = await axios.post('http://localhost:3001/number-of-items',{}, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          });
  
          const cartValue = response.data.value;
          console.log('Cart Value:', cartValue);
          setCartValue(cartValue);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
      fetchCartItems();
    }
  }, [authToken, cartAccess]);
  

  const handleSearch = (val) => {
    if (val !== '') {
      setSearch(val);
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleKey = (val) => {
    val.key === "Enter" && (window.location.href = `/shop/${search}`);
  }

  const navClass = isScrolled ? 'nav changeNavBg' : 'nav';

  return (
    <div>
      <div className={navClass} id="navid">
        <Link to={'/'} className="logo">
          <img src={trezlogo} alt="logo" height="60rem" width="auto" />
        </Link>

        <div className="navb">
          <ul className="list">
            <li>
              <Link to={'/shop'} className="navitems">
                Shop
              </Link>
            </li>
            <div className="searchfull">
              <input type="text" className='shopsearch' placeholder='search...' onChange={(e) => handleSearch(e.target.value)} onKeyDown={(e) => handleKey(e)} />
              <a href={`/shop/${search}`} className='shopsearchbutton'><img src={searchimg} alt="searchimg" /></a>
            </div>
            <li>
              <Link to={'/cart'} className='navitems'>
                <img src={shoppingCart} alt="shopping-cart" height="30rem" width="35rem" />
              </Link>
            </li>
            <li>
              <Link to={'/account/signup'} className='navitems'>
                <img src={accimg} alt="accounnt" height="35rem" width="40rem" />
              </Link>
            </li>
          </ul>
          <div className="cartval">
            <span className='cartValue'>{cartValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
