import React, { useState, useEffect} from 'react';
import records from '../homeclothes.json';
import { Card } from 'react-bootstrap';

function Shop() {
    const link  = window.location.href.slice(27).replaceAll('%20' , ' ')
  const [filter, setFilter] = useState({ brand: 'all', type: 'all' });
  const [filteredData, setFilteredData] = useState(records);
  useEffect(() => {
    let newData = records;

    if (filter.brand !== 'all') {
      newData = newData.filter((item) => item.brand === filter.brand);
    }

    if (filter.type !== 'all') {
      newData = newData.filter((item) => item.tag === filter.type);
    }

    setFilteredData(newData);
  }, [filter]);

  const handleBrandChange = (event) => {
    setFilter({ ...filter, brand: event.target.value });
  };

  const handleTypeChange = (event) => {
    setFilter({ ...filter, type: event.target.value });
  };

  useEffect(() => {
    if (link !== ''){
      const a = filteredData.filter((data) => {
        return Array.isArray(data.hash) && data.hash.includes(link);
      });
      setFilteredData(a);
    }
  }, [link]);
  
  
 

  return (
    <div className="shop">
      <div className="filteritems">
        <div className="type">
          <label htmlFor="type">Type:</label>
          <input type="radio" id="allitems" name="type" value="all" defaultChecked onChange={handleTypeChange} />
          <label htmlFor="allitems">All</label>
          <input type="radio" id="premium" name="type" value="premium" onChange={handleTypeChange} />
          <label htmlFor="premium">Premium</label>
          <input type="radio" id="limited" name="type" value="limited" onChange={handleTypeChange} />
          <label htmlFor="limited">Limited</label>
        </div>
        <div className="brands">
          <label htmlFor="brand">Brand:</label>
          <select name="brand" id="brandchoice" value={filter.brand} onChange={handleBrandChange}>
            <option value="all">All</option>
            <option value="H&M">H&M</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
      </div>
      <div className="items">
        {filteredData.map((item) => (
          <div key={item.id} className="pcard shopcomponentcard">
            <a href={`/items/${item.name}`}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.img} height={200} width={200} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <p>{item.brand}</p>
                  <p>Rs. {item.price}</p>
                </Card.Body>
              </Card>
            </a>
          </div>
        ))}
      </div>
      {(filteredData.length===0 && <p className='noitemsfound'>No items found!</p>)}
    </div>
  );
}

export default Shop;
