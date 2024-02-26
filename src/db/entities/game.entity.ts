import { Game, GameAddShipsReq, Room } from '../../models';

export class GameRepository {
  private games: Game[] = [];

  create(room: Room): Game {
    const game: Game = new Game(room.roomUsers);

    this.games.push(game);

    return game;
  }

  addPlayersShips(playerShipData: GameAddShipsReq): Game | null {
    const gameIndex: number = this.games.findIndex(
      (game) => game.gameId === playerShipData.gameId,
    );

    const game: Game = this.games[gameIndex];

    if (gameIndex !== -1 && game) {
      game.playersShips.push({
        ships: playerShipData.ships,
        playerIndex: playerShipData.indexPlayer,
      });

      return game;
    } else {
      // TODO: Throw Error
      return null;
    }
  }
}
