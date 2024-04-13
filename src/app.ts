import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { userRouter } from './routers/user.router.js';
export const app = express();

const debug = createDebug('W6*:app');
debug('user app');

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use(express.static('public'));

app.use('/user', userRouter);
