import { randomUUID } from 'crypto';
import { RoomUser, Ship } from '.';

export type PlayersShips = {
  ships: Ship[];
  playerIndex: string;
  // add filed BattleField???
};

export interface IGame {
  gameId: string;
  players: RoomUser[];
  playersShips: PlayersShips[];
}

export class Game implements IGame {
  gameId: string;
  players: RoomUser[] = [];
  playersShips: PlayersShips[] = [];

  constructor(users: RoomUser[]) {
    this.gameId = randomUUID();
    this.players = users;
  }
}
