import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import model from './images/newmd.jpg';
import { Link } from 'react-router-dom';

function UpperHome() {
    return ( 
        <>
            <section className="bg">
                <img src={model} alt="model" className='modelimg'/>
                <div className="uppertext">
                    <span className="exclusive"> Exclusive</span> 
                    <h3 className="upFont">
                        New Year's Sale!
                    </h3>
                    <p className="upFont2">
                        Upto 70% Off!
                    </p>
                    <button className=" btn rounded-pill btn-dark signb px-5" href='signin'>
                        <Link to="account/signup">Sign Up</Link>
                    </button>
                    <button className="btn rounded-pill btn-outline-dark signa px-5 ">
                        <Link to="account/login">Login</Link>
                    </button>
                </div>
                
            </section>
            

            
    </>
     );
}

export default UpperHome;