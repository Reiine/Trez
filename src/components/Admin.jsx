import axios from 'axios';
import React, { useState } from 'react';

function Admin() {
    const [img, setImg] =useState('')
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [tag, setTag] = useState('')
    const [price, setPrice] = useState('')
    const [des, setDes] = useState('')
    const [hash, setHash] = useState('')

    async function submit(){
        try{
            await axios.post('http://localhost:3001/admin',{
                img,name,brand,price,des,hash,tag
            })
        }catch(e){
            console.log('er')
        }
    }

    return ( 
        <div className="admin-cover p-5">
            <br />
            <br />
            <label htmlFor="img">Image link:</label>
            <input type="text" onChange={(e)=>setImg(e.target.value)}/>
            <label htmlFor="name">Name:-</label><br />
            <input type="text" onChange={(e)=>setName(e.target.value)}/><br />
            <label htmlFor="brand">Brand:-</label><br />
            <input type="text" onChange={(e)=>setBrand(e.target.value)}/><br />
            <label htmlFor="tag">tag:-</label><br />
            <input type="text" onChange={(e)=>setTag(e.target.value)}/><br />
            <label htmlFor="price">price:-</label><br />
            <input type="text" onChange={(e)=>setPrice(e.target.value)}/><br />
            <label htmlFor="des">des:-</label><br />
            <input type="text" onChange={(e)=>setDes(e.target.value)}/><br />
            <label htmlFor="hash">hash:-</label><br />
            <input type="text" onChange={(e)=>setHash(e.target.value)}/>
            <button onClick={submit}>Submit</button>
        </div>
     );
}

export default Admin;