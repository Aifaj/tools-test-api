const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/mongo');
require('./config/mysql');

const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
