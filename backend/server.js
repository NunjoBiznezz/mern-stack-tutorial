//server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // auth: {
        //     user: MONGODB_USER,
        //     password: MONGODB_PASSWORD
        // },
        // authSource: 'admin'
    })
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => {
        console.error(`Error connecting to mongodb at \"${mongoURI}\"`, err)
        process.exit(1);  // Exit the process with an error code (1 indicates an error)
    });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const itemRouter = require('./routes/items');
app.use('/items', itemRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
