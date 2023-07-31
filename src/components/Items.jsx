import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CardComponent } from './HomeCard';
import axios from 'axios';

function Items({authToken, setCartVal}) {
  const [filterNew, setFilterNew] = useState([]);
  const { id } = useParams();
  console.log(id)
  const [itemFilter, setItemFilter] = useState(null);
  const [cartStock, setCartStock] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/product`)
      .then(response => {
        const data = response.data;
        const item = data.find(item => item._id === id);
        setItemId(item._id)
        if (item) {
          setItemFilter(item);
          const temp = data.filter(dataItem => dataItem.name !== id);
          const newtemp = temp.length > 8 ? temp.splice(0, 8) : temp;
          setFilterNew(newtemp);
        }
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, [id]);

  async function handleCart() {
    try {
      await axios.post('http://localhost:3001/addToCart', {
        quantity,
        itemId,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (e) {
      console.log("Error adding to cart");
    }
  }

  return (
    <div className="itemscover">
      {itemFilter && (
        <div className='itemParentDiv'>
          <img src={itemFilter.img} alt="item" />
          <div className='textonly'>
            <h5>{itemFilter.name}</h5>
            <p>{itemFilter.brand}</p>
            <p>Rs. {itemFilter.price}</p>
            <div className="itemquantity">
              <label htmlFor={`quantity-${itemFilter.name}`}>Quantity:</label>
              <select name="quantity" id={`quantity`} value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value))}>
                {Array.from({ length: cartStock }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="itembuttons">
              <Button variant='success' size='lg'>Buy Now</Button>
              <Button variant='warning' size='lg' onClick={handleCart}>Add to cart</Button>
            </div>
          </div>
        </div>
      )}
      <div className="browseotheritemscover">
        <p>Browse Other Items</p>
        <div className="itemcomponentcard">
          {filterNew.map((element, index) => {
            return (
              <a href={`/items/${element.name}`} key={index}>
                <div className="pcard" key={index}>
                  <CardComponent element={element} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Items;
