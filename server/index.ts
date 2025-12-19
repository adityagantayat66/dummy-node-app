import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import dotenv from 'dotenv';
import { login, register } from './controllers/auth.controller.js';
import {isAuthenticated} from './middlewares/auth.middleware.js';
import { all_users } from './providers/data.js';
import { fetchUserData } from './controllers/dashboard.controller.js';

//? set up server
dotenv.config();
const app = express();
const upload = multer();

//? set up middlewares
app.use(express.json());
app.use(upload.none())
app.use(cors(), helmet());
//? set up routes

app.get('/', (req, res)=>{
    res.send('hello')
})
app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/test', isAuthenticated, (req, res)=>{
    res.status(200).json('successful');
})
app.get('/api/getDashboardData', isAuthenticated, fetchUserData)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
