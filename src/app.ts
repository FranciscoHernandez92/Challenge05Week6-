import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { sportRouter } from './routers/sport.router.js';
export const app = express();

app.use(express.json());

app.use(morgan('dev'));

// A app.use(cors());

app.use(express.static('public'));

app.use('/sports', sportRouter);
