import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import authRoutes from './routes/user'
import config from './config'
import logging from './logging'

const NAMESPACE = 'Application';
const app = express();


/** Connect to Mongo */
console.log(`Trying to connect to ${config.mongo.url} with options ${config.mongo.options}`)
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(authRoutes);

export default app;