import { randomUUID } from 'crypto';
import { IUser } from '.';

export interface IRoom {
  roomId: string;
  roomUsers: RoomUser[];
}

export type RoomUser = Omit<IUser, 'password'>;

export class Room implements IRoom {
  roomId: string;
  roomUsers: RoomUser[] = [];

  constructor() {
    this.roomId = randomUUID();
  }
}
