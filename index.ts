import { WebSocket, WebSocketServer } from 'ws';
import { httpServer } from './src/http_server/index';
import { onConnection } from './src/wss/index';
import * as dotenv from 'dotenv';

dotenv.config();

// TODO: refactor order
// TODO: add strings to constants
const HTTP_PORT = Number(process.env.APP_HTTP_PORT) || 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
});

const wssPort = Number(process.env.APP_SERVER_PORT) || 3000;

const wss = new WebSocketServer({ port: wssPort }, () => {
  console.log(`WebSocket Server Started on ${wssPort} port!`);
});

wss.on('connection', (ws: WebSocket) => onConnection(ws));
