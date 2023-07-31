import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CardComponent({ element }) {
    const handleTop = (e) =>{
        e.target.scrollY=0;
    }
    return (
        <Link to={`/items/${element._id}`} onClick={(e)=>handleTop(e)}>
            <div className="pcard">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={element.img} height={200} width={200} />
                    <Card.Body>
                        <Card.Title>{element.name}</Card.Title>
                        <p>{element.brand}</p>
                        <p>Rs.{element.price}</p>
                    </Card.Body>
                </Card>
            </div>
        </Link>
    );
}

function HomeCard() {
    const [premiumItems, setPremiumItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3001/product');
                const data = response.data;
                const filteredData = data.filter((item) => item.tag === 'premium' || item.tag === 'limited');
                const slicedData = filteredData.slice(0, 4);
                setPremiumItems(slicedData);
            } catch (e) {
                console.log('Error fetching data:', e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="homecardcover">
            <p className="homecardtopic">
                <span style={{ borderBottom: '3px solid black' }}>Premium</span>
            </p>
            <div className="hcard">
                {premiumItems.map((element, index) => (
                    <CardComponent element={element} key={index} />
                ))}
            </div>
            <p className="homecardtopic">
                <span style={{ borderBottom: '3px solid black' }}>Exclusive</span>
            </p>
            <div className="hcard">
                {premiumItems.map((element, index) => (
                    <CardComponent element={element} key={index} />
                ))}
            </div>
        </div>
    );
}


export { HomeCard, CardComponent };