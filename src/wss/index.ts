import { WebSocket } from 'ws';
import { handleMessage } from './handlers';

export const onConnection = (ws: WebSocket) => {
  // TODO: Improve error handling
  ws.on('error', console.error);

  ws.on('close', (ws: WebSocket) => {
    // TODO: add proper close websocket
    console.log('Close ws: ', ws);
  });

  ws.on('message', (message: string) => {
    handleMessage(ws, message);
  });
};
