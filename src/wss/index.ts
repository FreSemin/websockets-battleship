import { WebSocket } from 'ws';

export const onConnection = (ws: WebSocket) => {
  // TODO: Improve error handling
  ws.on('error', console.error);

  ws.on('close', (ws: WebSocket) => {
    // TODO: add proper close websocket
    console.log('Close ws: ', ws);
  });

  ws.on('message', (message) => {
    console.log('message: ', message);
  });
};
