import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trezlogo from '../components/images/trezlogo.png';
import shoppingCart from '../components/images/sc.png';
import searchimg from './images/search.png';
import accimg from './images/acc.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Nav({ authToken, cartAccess, cartItemCount,setCartItemCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken) {
      async function fetchCartItems() {
        try {
          const response = await axios.post('/number-of-items', {}, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          });
          const cartItemCount = response.data.value;
          setCartItemCount(cartItemCount);

          const cartValue = response.data.value;
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
    if (val.key === 'Enter') {
      navigate(`/shop/${search}`);
    }
  };
  

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
              <Link to={`/shop/${search}`} className='shopsearchbutton'><img src={searchimg} alt="searchimg" /></Link>
            </div>
            <li>
              <Link to={'/cart'} className='navitems'>
                <img src={shoppingCart} alt="shopping-cart" height="30rem" width="35rem" />
              </Link>
            </li>
            <li>
              <Link to={'/account'} className='navitems'>
                <img src={accimg} alt="accounnt" height="35rem" width="40rem" />
              </Link>
            </li>
          </ul>
          <div className="cartval">
            <span className='cartValue'>{cartItemCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
