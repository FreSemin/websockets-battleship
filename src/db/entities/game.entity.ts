import { Game, Room } from '../../models';

export class GameRepository {
  private games: Game[] = [];

  create(room: Room): Game {
    const game: Game = new Game(room.roomUsers);

    this.games.push(game);

    return game;
  }
}
