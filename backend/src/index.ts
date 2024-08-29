//server.js

import {Connection} from 'mongoose';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

// MongoDB connection
const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoURI,
    {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch((err: any) => {
        console.error(`Error connecting to mongodb at \"${mongoURI}\"`, err)
        process.exit(1);  // Exit the process with an error code (1 indicates an error)
    });

const connection: Connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const itemRouter = require('./routes/items');
app.use('/items', itemRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
