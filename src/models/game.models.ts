import { randomUUID } from 'crypto';
import { RoomUser } from '.';

export interface IGame {
  gameId: string;
  players: RoomUser[];
  // TODO:
  // ships: Ships[]
  // TODO:
  // turn?
}

export class Game implements IGame {
  gameId: string;
  players: RoomUser[] = [];
  // TODO:
  // ships: Ships[]

  constructor(users: RoomUser[]) {
    this.gameId = randomUUID();
    this.players = users;
  }
}
