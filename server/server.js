const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const register = require('./models/register');
const products = require('./models/products')
const cartItems = require('./models/cartitems');
const app = express();
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the correct frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function verifyUser(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                currentUser = user;
                req.user = user; // Set the user object on the request for further processing
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

app.post('/register', async (req, res) => {
    const { name, email, gender, pass } = req.body;
    const password = await bcrypt.hash(pass, 10);
    const regData = new register({
        name: name,
        email: email,
        pass: password,
        gender: gender
    });
    try {
        const regDataDB = await regData.save()
        res.json("Successfully Registered")
    } catch (e) {
        console.log('error sending to mongo')
    }
})

app.post('/login', async (req, res) => {
    const { email, pass } = req.body;
    const userLog = await register.findOne({ email: email });
    if (userLog) {
        try {
            const isLogUser = await bcrypt.compare(pass, userLog.pass);
            if (isLogUser) {
                const token = jwt.sign(userLog.toJSON(), process.env.SECRET_KEY);
                res.json({ token: token, message: 'logsuccess' });
            } else {
                res.json({ message: 'wrong credentials' });
            }
        } catch (error) {
            console.log('Error comparing passwords:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.json({ message: 'user not registered' });
    }
});

app.post('/admin', async (req, res) => {
    console.log('admin');
});

app.get('/product', async (req, res) => {
    try {
        const allProducts = await products.find({});
        res.json(allProducts);
    } catch (e) {
        console.log('Product fetch error:', e);
        res.status(500).json({ error: 'Error fetching product data' });
    }
});


app.post('/addToCart', verifyUser, async (req, res) => {
    try {
      const user = req.user;
      const cart = await cartItems.findOne({ userId: user._id });
  
      if (cart) {
        const { itemId, quantity } = req.body;
        cart.cartItems.push({ itemId, quantity }); // Push new cart item object into the array
        await cart.save();
      } else {
        const { itemId, quantity } = req.body;
        const newCart = new cartItems({
          userId: user._id,
          cartItems: [{ itemId, quantity }], // Initialize cartItems array with the new cart item
        });
        await newCart.save();
      }
  
      res.json({ message: 'Added to cart successfully' });
    } catch (e) {
      console.log('Error sending to database');
      res.status(500).json({ error: 'Error sending data' });
    }
  });
  

app.post('/number-of-items', verifyUser, async (req, res) => {
    try {
        const user = req.user;
        const items = await cartItems.findAll({ userId: user._id })
        const noOfItems = items.length();
        console.log(noOfItems);
        res.json({value : noOfItems, message:"Successfully updated"})
    }catch(e){
        res.json("can't update cart value")
    }
    

})

app.listen(3001)