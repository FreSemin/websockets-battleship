import { WebSocket } from 'ws';
import { AppDBService } from '../../db';
import { EMessageTypes, MessageRes, RegDataRes } from '../../models';

export const handleReg = (data: string, ws: WebSocket) => {
  try {
    AppDBService.regUser(data, ws);
  } catch (error) {
    // TODO: refactor
    if (error instanceof Error) {
      const res: MessageRes<RegDataRes> = new MessageRes<RegDataRes>(
        EMessageTypes.reg,
        {
          error: true,
          errorText: error.message,
          index: '',
          name: '',
        },
      );

      ws.send(res.toJSON());
    }
  }
};
