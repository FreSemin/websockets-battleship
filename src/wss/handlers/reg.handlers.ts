import { WebSocket } from 'ws';
import { AppDBService } from '../../db';

export const handleReg = (data: string, ws: WebSocket) => {
  try {
    AppDBService.regUser(data, ws);
  } catch (error) {
    // TODO: send error res
    // TODO: update winners
  }
};
