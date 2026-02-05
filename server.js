const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
require('./config/db');

const giminiAiphotoRoutes = require("./routes/giminiAiphotoRoutes");
const userRoutes = require('./routes/userroutes');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/giminiAiphoto", giminiAiphotoRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
