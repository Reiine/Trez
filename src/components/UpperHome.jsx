import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpperHome() {
    const handleRedirect = (val) =>{
        if (val==="signin"){
            window.location.href='/account/signup';
        }
        else if (val === "login"){
            window.location.href='account/login';
        }
    }
    return ( 
        <>
            <section className="bg">
                <div className="uppertext">
                    <span className="exclusive"> Exclusive</span> 
                    <h3 className="upFont">
                        New Year's Sale!
                    </h3>
                    <p className="upFont2">
                        Upto 70% Off!
                    </p>
                    <button className="btn rounded-pill btn-dark signb px-5" onClick={() => handleRedirect("signin")}>
                        Sign Up
                    </button>
                    <button className="btn rounded-pill btn-outline-dark signb px-5" onClick={()=>handleRedirect("login")}>
                        Login
                    </button>
                </div>
                
            </section>
            

            
    </>
     );
}

export default UpperHome;