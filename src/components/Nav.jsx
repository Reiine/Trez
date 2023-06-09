import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import trezlogo from '../components/images/trezlogo.png';
import shoppingCart from '../components/images/sc.png';
import searchimg from './images/search.png';
import accimg from './images/acc.png';

function Nav(props) {
  const disable = true;
  const disableCheck = (disable === true ? "disableCheck" : "navitems")
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState('')
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

  // eslint-disable-next-line no-unused-vars


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
            <li aria-disabled>
              <a to={'/sell'} className={disableCheck} disabled={true} title='please login to access'>
                Sell
              </a>
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
            <span className='cartValue'>{props.cartValue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;

//il capitano from noun project 