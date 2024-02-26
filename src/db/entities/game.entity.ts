import { Game, GameAddShipsReq, PlayerData, Room } from '../../models';

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

    const player: PlayerData | undefined = game.playersData.find(
      (player) => player.playerId === playerShipData.indexPlayer,
    );

    if (gameIndex !== -1 && game && player) {
      player.ships = playerShipData.ships;

      return game;
    } else {
      // TODO: Throw Error
      return null;
    }
  }

  getPlayerIdTurn(game: Game): string {
    return game.playersData[game.playerTurn].playerId;
  }
}
