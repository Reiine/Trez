import React from 'react';
import records from '../homeclothes.json';
import { Card } from 'react-bootstrap';

function CardComponent({ element }) {
    return (
        <a href={`/items/${element.name}`}>
            <div className="pcard">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={element.img} height={200} width={200}/>
                    <Card.Body>
                        <Card.Title>{element.name}</Card.Title>
                        <p>{element.brand}</p>
                        <p>Rs. {element.price}</p>
                    </Card.Body>
                </Card>
            </div>
        </a>
    );
}

function HomeCard() {
    var filterpre = records.filter((data)=>{
        return data.tag==="premium" || data.tag==="limited";
    })
    filterpre = filterpre.slice(0, 4);
    return ( 
        <div className="homecardcover">
            <p className='homecardtopic'><span style={{borderBottom:"3px solid black"}}>Pre</span>mium</p>
            <div className='hcard'>
                {filterpre.map((element, index) => <CardComponent element={element} key={index} />)}
            </div>
            <p className='homecardtopic'><span style={{borderBottom:"3px solid black"}}>Exc</span>lusive</p>
            <div className='hcard'>
                {filterpre.map((element, index) => <CardComponent element={element} key={index} />)}
            </div> 
        </div>
     );
}

export default HomeCard;
