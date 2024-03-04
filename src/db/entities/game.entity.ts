import { Game, GameAddShipsReq, PlayerData, Room } from '../../models';
import { addShipsToBattleField } from '../../utils';

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

      player.battleField = addShipsToBattleField(
        player.battleField,
        player.ships,
      );

      return game;
    } else {
      // TODO: Throw Error
      return null;
    }
  }

  getPlayerIdTurn(game: Game): string {
    return game.playersData[game.playerTurn].playerId;
  }

  getGameById(gameId: string): Game | null {
    return this.games.find((game) => game.gameId === gameId) || null;
  }
}
