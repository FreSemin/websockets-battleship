import { AppDBService } from '../../db';

export const handleGameAddShips = (data: string) => {
  try {
    AppDBService.addShipsToGame(data);
  } catch (error) {
    // TODO: send error res
  }
};
