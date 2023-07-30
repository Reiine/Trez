const express = require('express');
const cors = require('cors');
const register = require('./models/register');
const app =express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.post('/register', async (req,res)=>{
    const {name, email, gender, pass}= req.body;
    const regData = new register({
        name:name,
        email:email,
        pass:pass,
        gender:gender
    });
    try{
        const regDataDB = await regData.save()
    }catch(e){
        console.log('error sending to mongo')
    }
})

app.post('/login',async (req,res)=>{
    const {email, pass} = req.body;
    const logUser = await register.findOne({email:email});
    if(logUser){
        if(logUser.pass === pass){
            res.json('logsuccess');
        }
        else{
            res.json('wrong credientials')
        }
    }else{
        res.json('user not registered');
    }
})


app.listen(3001)