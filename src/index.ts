import { createServer } from 'http';
import 'dotenv/config';
import { createApp } from './app.js';
import createDebug from 'debug';

const debug = createDebug('W6*:server');
debug('starting server');
const port = process.env.PORT ?? 3500;
// FIJAMOS EL PUERTO A TRAVES DE SCRIPTS CON EL OBJETO PROCESS (PACKAGE.JSON) PERO ES INNECESARIO
const server = createServer(createApp());
// MONTAMOS EL SERVER
server.listen(port);
server.on('error', (error) => {
  debug('error:', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
