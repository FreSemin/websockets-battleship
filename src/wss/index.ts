import { WebSocket } from 'ws';

export const onConnection = (ws: WebSocket) => {
  ws.on('error', console.error);

  ws.on('close', (ws: WebSocket) => {
    console.log('Close ws: ', ws);
  });

  ws.on('message', (message) => {
    console.log('message: ', message);
  });
};
