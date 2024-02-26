import { WebSocket } from 'ws';
import { AppDBService } from '../../db';

export const handleCreateRoom = () => {
  try {
    AppDBService.createRoom();
  } catch (error) {
    // TODO: send error res
  }
};

export const handleAddUserToRoom = (data: string, ws: WebSocket) => {
  try {
    AppDBService.addUserToRoom(data, ws);
  } catch (error) {
    // TODO: send error res
  }
};
