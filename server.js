const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//require('./config/mongo');
const dotenv = require("dotenv");
dotenv.config();
require('./config/mysql');

const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
//app.use('/api/orders', orderRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

