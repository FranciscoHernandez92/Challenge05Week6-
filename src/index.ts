import { createServer } from 'http';
import 'dotenv/config';
import { createApp, startApp } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './tools/db.connect.js';

const debug = createDebug('W6*:server');
debug('starting server');
const port = process.env.PORT ?? 3500;

const app = createApp();
const server = createServer(app);

dbConnect()
  .then((prisma) => {
    startApp(app, prisma);
    server.listen(port);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('error', (error) => {
  debug('error:', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server  express is running in port ${port}`);
});
