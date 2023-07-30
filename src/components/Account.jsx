import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function SignUp() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    async function submit(){
        try{
            await axios.post('http://localhost:3001/register',{
                name,email,gender,pass
            })
        }catch(e){
            console.log("Failed to send data");
        }
    }
    return (
        <div className='accountcover'>
            <div className='signincover'>
                <p className='form'>Register</p>
                <div className='form'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' placeholder='John Doe' onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='gender'>
                    <label htmlFor='gender'>Gender:</label>
                    <input
                        type='radio'
                        name='gender'
                        id='male'
                        value='male'
                        checked={gender === 'male'}
                        onChange={(e)=>setGender(e.target.value)}
                    />
                    <label htmlFor='male'>Male</label>
                    <input
                        type='radio'
                        name='gender'
                        id='female'
                        value='female'
                        checked={gender === 'female'}
                        onChange={(e)=>setGender(e.target.value)}
                    />
                    <label htmlFor='female'>Female</label>
                    <input
                        type='radio'
                        name='gender'
                        id='trans'
                        value='transgender'
                        checked={gender === 'transgender'}
                        onChange={(e)=>setGender(e.target.value)}
                    />
                    <label htmlFor='trans'>Transgender</label>
                </div>
                <div className='form'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' placeholder='example@xyz.com' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='form'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' onChange={(e)=>setPass(e.target.value)} />
                </div>
                <a href={`/account/login`} className='form'>
                    Already have an account?
                </a>
                <Button variant='primary' className='form'  onClick={submit}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

function LogIn() {
    const [email, setEmail] = useState('');
    const [pass , setPass] = useState('');

    async function submit (){
        try{
            await axios.post('http://localhost:3001/login',{
                email,pass
            })
        }catch(e){
            console.log('error in login');
        }
    }
    return (
        <div className='accountcover'>
            <div className='signincover'>
                <p className='form'>Login</p>
                <div className="form">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder='example@xyz.com' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form">
                    <label htmlFor="password">Password:</label>
                    <input type="password" onChange={(e)=>setPass(e.target.value)}/>
                </div>
                <a href={`/account/signup`} className='form'>Don't have an account?</a>
                <Button variant='dark' className='form br-0' onClick={submit}>Login</Button>

            </div>
        </div>
    );
}

export const Login = LogIn;
export const Signup = SignUp;


