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
        if (!req.user) {
            return res.status(401).json({ message: 'unauthorise' });
        }
        else {
            const user = req.user;
            const userMatch = await cartItems.find({ userId: user._id });

            const noOfItems = userMatch[0]?.cartItems?.length || 0;
            res.json({ value: noOfItems, message: 'Successfully updated' });
        }

    } catch (e) {
        console.error('Error fetching cart items:', e);
        res.status(500).json("Can't update cart value");
    }
});

app.post('/fetch-cart-items', verifyUser, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'unauthorise' })
        }
        else {
            const user = req.user;
            const userMatch = await cartItems.find({ userId: user._id });
            res.json(userMatch);
        }
    } catch (e) {
        console.log('Error loading cart items');
    }
})




function verifyUser(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(401).json({ error: 'Unauthorized2' });
            } else {
                currentUser = user;
                req.user = user; // Set the user object on the request for further processing
                next(); // Move next() inside the jwt.verify callback
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized1' });
    }
}


app.listen(3001)