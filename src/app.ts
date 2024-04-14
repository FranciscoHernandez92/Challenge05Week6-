import express from 'express';
import { sportRouter } from './routers/sport.router.js';
export const app = express();

app.use(express.json());
// UTILIZAMOS EXPRESS.JSON PARA INDICAR QUE NUESTRO SERVIDOR(APP) VA A UTILIZAR EXPRESS Y SU METODO JSON PARA LOS ELEMENTOS

app.use(express.static('public'));
// ACCEDE A LA CARPETA CON EL NOMBRE INDICADO Y LA USA DIRECTAMENTE

app.use('/sports', sportRouter);
// A TRAVES DEL METODO INDICAMOS LA URL Y CON EL SPORTROUTER ACCEDEMOS A LAS DISTINTAS URL QUE VAMOS A UTILIZAR
