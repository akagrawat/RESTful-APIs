const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB connection
const mongoose = require('mongoose');
const connection  = require('dotenv/config');

mongoose.connect('<DB_CONNECTION URL>',
{useUnifiedTopology: true }, () => console.log('Mongodb connected successfully'));


// Import routes
const movieRoutes = require('./routes/movie');

app.use('/', movieRoutes);  

const port = 3000;
app.listen(port, () => console.log(`Listing on port ${port}`));
