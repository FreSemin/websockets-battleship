import { randomUUID } from 'crypto';
import { RoomUser, Ship } from '.';
export type Position = {
  x: number;
  y: number;
};

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
  playerTurn: number;
}

export class Game implements IGame {
  gameId: string;

  playersData: PlayerData[] = [];

  playerTurn: number = 0;

  constructor(users: RoomUser[]) {
    this.gameId = randomUUID();

    users.forEach((user) => {
      this.playersData.push(new PlayerData(user.index));
    });
  }
}
