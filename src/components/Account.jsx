import React, {  useState } from 'react';
import { Button } from 'react-bootstrap';

function SignUp() {
    const [name, setName] = useState('')
    const handleName =() =>{
        (name !== '') && alert(`Hi ${name}, the sign up feature is currently not available.`);
    }
    return ( 
        <div className='accountcover'>
            <div className='signincover'>
                <p className='form'>Register</p>
                <div className='form'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" placeholder='John Doe' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="gender">
                    <label htmlFor="gender">Gender:</label>
                    <input type="radio" name='gender' id="male" />
                    <label htmlFor="male">Male</label>
                    <input type="radio" name='gender' id="female" />
                    <label htmlFor="female">Female</label>
                    <input type="radio" name='gender' id="trans" />
                    <label htmlFor="trans">Transgender</label>
                </div>
                <div className="form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder='example@xyz.com'/>
                </div>
                <div className="form">
                    <label htmlFor="password">Password:</label>
                    <input type="password" />
                </div>
                <a href={`/account/login`} className='form'>Already have an account?</a>
                <Button variant='primary' className='form' onClick={handleName}>Sign Up</Button>

            </div>
        </div>
     );
}

function LogIn() {
    const handleClick = () =>{
        alert("Sorry! Currently only admin can login.")
    }
    return ( 
        <div className='accountcover'>
            <div className='signincover'>
                <p className='form'>Login</p>
                <div className="form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder='example@xyz.com'/>
                </div>
                <div className="form">
                    <label htmlFor="password">Password:</label>
                    <input type="password" />
                </div>
                <a href={`/account/signup`} className='form'>Don't have an account?</a>
                <Button variant='primary' className='form' onClick={handleClick}>Login</Button>

            </div>
        </div>
     );
}

export const Login = LogIn;
export const Signup = SignUp;


