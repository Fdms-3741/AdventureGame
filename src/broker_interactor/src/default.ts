import dotenv from 'dotenv';

dotenv.config();

const RABBITMQ_USER = process.env.RABBITMQ_USER;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;

const RABBITMQ_HOST_ADDRESS = "amqp://"+RABBITMQ_USER+":"+RABBITMQ_PASSWORD+"@"+process.env.RABBITMQ_HOST_ADDRESS;

export {RABBITMQ_HOST_ADDRESS};