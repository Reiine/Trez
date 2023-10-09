import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CardComponent({ element }) {
    return (
        <Link to={`/items/${element._id}`}>
            <div className="pcard">
                <Card style={{ width: '18rem',height:'25rem' }}>
                    <Card.Img variant="top" src={element.img} height={220} width={100}  />
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
    const [exclusiveItems, setExclusiveItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/product');
                const data = response.data;
                const premData = data.filter((item) => item.tag === 'premium');
                const slicedData = premData.slice(0, 4);
                setPremiumItems(slicedData);
                const excData = data.filter((item) => item.tag === 'limited' );
                const excSlicedData = excData.slice(0,4);
                setExclusiveItems(excSlicedData);
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
                <span style={{ borderBottom: '3px solid black' }}>Limited</span>
            </p>
            <div className="hcard">
                {exclusiveItems.map((element, index) => (
                    <CardComponent element={element} key={index} />
                ))}
            </div>
        </div>
    );
}


export { HomeCard, CardComponent };