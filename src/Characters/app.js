/*
 * app.js
 *
 * Description: This file implements the CRUD application that manages Characters 
 *
 *
 * */

/* Applictin */

/* Used libraries*/
const express = require('express') /* HTTP Handler */
const mongo = require('mongodb') /* API for integration with MongoDB database */
const amqp = require('amqplib/callback_api'); /* For integration with RabbitMQ message broker */

/* Reads from dotenv file in project's root folder. Overwrites already defined ones */
require('dotenv').config()

/* Constants */
const GatewayAddress  = "http://gateway/"
const MongoDBAddress  = "mongodb+srv://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD +"@characterdb/character" /* Gets username and password from environment variables set in the container */
const RabbitMQAddress = "http://broker/"

/* Create application */
const app = express()

/* Connect to MongoDB database */
const db = mongo.connect(GatewayAddress+"characters/")


/* Defining REST application */
