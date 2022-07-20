import logging from './logging';
import app from './app'
import config from './config'
import mongoose from "mongoose";

const NAMESPACE = 'Server';

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


app.listen(config.server.port);