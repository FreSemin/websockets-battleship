import { Game, PlayerData } from '../models';

export const isAllPlayersSetShips = (game: Game): boolean => {
  let result: boolean = true;

  game.playersData.forEach((playerData: PlayerData) => {
    if (playerData.ships.length === 0) {
      result = false;
    }
  });

  return result;
};
