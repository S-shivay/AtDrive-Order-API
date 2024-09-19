const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());



app.use(bodyParser.json());


const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);


mongoose.connect(process.env.DB_CONNECT,)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
