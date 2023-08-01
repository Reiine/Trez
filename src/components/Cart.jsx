import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cart({ isLogin, authToken }) {
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.post(
                    'http://localhost:3001/fetch-cart-items',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                setCartItems(response.data[0].cartItems)
            } catch (e) {
                console.log('Error fetching cart items:', e);
            }
        }
        fetchCartItems();
    }, []); 

    return (
        <>
            {(!isLogin ?
                <div className='cartcover'>
                    <p>Please Register/Login to access the cart</p>
                    <div className="log-reg-btn">
                        <button className='btn btn-dark'>Register</button>
                        <button className='btn btn-dark'>Login</button>
                    </div>
                </div> :
                <div className="logged-in-cart">
                    <div className="cart-item">
                        {cartItems.map((item)=>{
                            <p>{item}</p>
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;