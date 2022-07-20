import express from "express";
import bodyParser from 'body-parser'
import authRoutes from './routes/user'

const NAMESPACE = 'Application';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(authRoutes);

export default app;