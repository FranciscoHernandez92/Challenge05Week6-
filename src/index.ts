import { createServer } from 'http';
import 'dotenv/config';
import { app } from './app.js';
import createDebug from 'debug';

const debug = createDebug('W6*:server');

const port = process.env.PORT ?? 3500;
// FIJAMOS EL PUERTO A TRAVES DE SCRIPTS CON EL OBJETO PROCESS (PACKAGE.JSON) PERO ES INNECESARIO
const server = createServer(app);
// MONTAMOS EL SERVER
server.listen(port);

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
