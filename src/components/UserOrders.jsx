import React from 'react';
import { useParams } from 'react-router-dom';


function UserOrders() {
    const {boolean,orderId} = useParams();
    return ( 
        <div className="user-order-cover">
            <h1 className='center'>{boolean==="success"? `Your Order Id is: OD${orderId}`: (boolean==="failed"&&`Payment Failed For Order Id: OD${orderId}`)}</h1>
        </div>
     );
}

export default UserOrders;