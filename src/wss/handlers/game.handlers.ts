import { AppDBService } from '../../db';

export const handleGameAddShips = (data: string) => {
  try {
    AppDBService.addShipsToGame(data);
  } catch (error) {
    // TODO: send error res
  }
};

export const handleGameAttack = (data: string) => {
  try {
    AppDBService.doPlayerAttack(data);
  } catch (error) {
    // TODO: send error res
  }
};
