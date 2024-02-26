import { WebSocket } from 'ws';
import { AppDBService } from '../../db';

export const handleCreateRoom = (ws: WebSocket) => {
  try {
    AppDBService.createRoom(ws);
  } catch (error) {
    // TODO: send error res
  }
};
