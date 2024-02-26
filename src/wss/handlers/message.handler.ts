import { WebSocket } from 'ws';
import {
  handleAddUserToRoom,
  handleCreateRoom,
  handleGameAddShips,
  handleReg,
} from '.';
import { EMessageTypes, Message } from '../../models';

export const handleMessage = (ws: WebSocket, msg: string) => {
  try {
    const parsedMessage: Message<string> = JSON.parse(msg);

    switch (parsedMessage.type) {
      case EMessageTypes.reg:
        handleReg(parsedMessage.data, ws);
        break;

      case EMessageTypes.createRoom:
        handleCreateRoom();
        break;

      case EMessageTypes.addUserToRoom:
        handleAddUserToRoom(parsedMessage.data, ws);
        break;

      case EMessageTypes.addShips:
        handleGameAddShips(parsedMessage.data);
        break;

      default:
        // TODO: throw error
        console.log('Unknown message type!');
        break;
    }
  } catch (error) {}
};
