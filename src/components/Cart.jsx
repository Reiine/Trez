import React from 'react';

function Cart() {
    return (
        <div className='cartcover'>
            <p>Please Register/Login to access the cart</p>
            <div className="log-reg-btn">
                <button className='btn btn-dark'>Register</button>
                <button className='btn btn-dark'>Login</button>
            </div>
        </div>
    );
}

export default Cart;