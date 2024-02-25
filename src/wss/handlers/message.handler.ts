import { WebSocket } from 'ws';
import { EMessageTypes, Message } from '../models';
import { handleReg } from '.';

export const handleMessage = (ws: WebSocket, msg: string) => {
  try {
    const parsedMessage: Message<string> = JSON.parse(msg);

    switch (parsedMessage.type) {
      case EMessageTypes.reg:
        handleReg(parsedMessage.data, ws);
        break;

      default:
        // TODO: throw error
        console.log('Unknown message type!');
        break;
    }
  } catch (error) {}
};
