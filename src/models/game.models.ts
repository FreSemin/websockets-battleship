import { randomUUID } from 'crypto';
import { RoomUser, Ship } from '.';

export interface IPlayerData {
  playerId: string;
  ships: Ship[];
}

export class PlayerData implements IPlayerData {
  playerId: string;
  ships: Ship[] = [];

  constructor(playerId: string) {
    this.playerId = playerId;
  }
}

export interface IGame {
  gameId: string;
  playersData: PlayerData[];
}

export class Game implements IGame {
  gameId: string;

  playersData: PlayerData[] = [];

  constructor(users: RoomUser[]) {
    this.gameId = randomUUID();

    users.forEach((user) => {
      this.playersData.push(new PlayerData(user.index));
    });
  }
}
