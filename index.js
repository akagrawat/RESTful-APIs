const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//DB connection
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect('url',
{useUnifiedTopology: true }, () => console.log('Mongodb connected successfully'));

// Import routes
const movieRoutes = require('./routes/movie');

app.use('/', movieRoutes);  

//routes
// app.get('/', (req,res)=>{
//     res.send(movies);
// });

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listing on port ${port}`));
