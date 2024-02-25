import { WebSocket } from 'ws';
import { EMessageTypes, Message } from '../models';

export const handleMessage = (ws: WebSocket, msg: string) => {
  try {
    const parsedMessage: Message<string> = JSON.parse(msg);

    switch (parsedMessage.type) {
      case EMessageTypes.reg:
        break;

      default:
        // TODO: throw error
        console.log('Unknown message type!');
        break;
    }
  } catch (error) {}
};
