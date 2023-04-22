import React, {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import records from '../homeclothes.json';
import { Button, Card } from 'react-bootstrap';


function Items(props) {
  const [cartValue, setCartValue] = useState(0)
  const [filterNew, setFilterNew] = useState(records)
  const { name } = useParams();
  const itemFilter = records.filter(data => data.name === name);

  useEffect(() => {
    const temp = records.filter((data) => {
      return data.name !== name;
    })
    var newtemp = temp.length > 8 ? temp.splice(0, 8) : temp;
    setFilterNew(newtemp)
  }, [])

  const handleCart = () =>{
    props.onClick()
  }


  return (
    <div className="itemscover">
      <div className='itemParentDiv'>
        <img src={itemFilter[0].img} alt="item" />
        <div className='textonly'>
          <h5>{itemFilter[0].name}</h5>
          <p>{itemFilter[0].brand}</p>
          <p>Rs. {itemFilter[0].price}</p>
          <div className="itemquantity">
            <label htmlFor={`quantity-${itemFilter[0].name}`}>Quantity:</label>
            <select name="quantity" id={`quantity-${itemFilter[0].name}`}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="2">3</option>
              <option value="2">4</option>
              <option value="2">5</option>
            </select>
          </div>
          <div className="itembuttons">
            <Button variant='success' size='lg'>Buy Now</Button>
            <Button variant='warning' size='lg' onClick={handleCart}>Add to cart</Button>
          </div>
        </div>
      </div>
      <div className="browseotheritemscover">
        <p>Browse Other Items</p>
        <div className="itemcomponentcard">
          {filterNew.map((element, index) => {
            return (
              <a href={`/items/${element.name}`}>
                <div className="pcard" key={index}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={element.img} height={200} width={200} />
                    <Card.Body>
                      <Card.Title>{element.name}</Card.Title>
                      <p>{element.brand}</p>
                      <p>Rs. {element.price}</p>
                    </Card.Body>
                  </Card>
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
