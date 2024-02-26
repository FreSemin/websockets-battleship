import { Room, Ship, Winner } from '.';

export enum EMessageTypes {
  reg = 'reg',
  updateWinners = 'update_winners',
  createRoom = 'create_room',
  updateRoom = 'update_room',
  addUserToRoom = 'add_user_to_room',
  createGame = 'create_game',
  addShips = 'add_ships',
  startGame = 'start_game',
  turn = 'turn',
}

// TODO: data only string?
export type Message<T extends MessageDataTypes> = {
  type: EMessageTypes;
  data: T;
  id: number;
};

// TODO: improve types, type from message?
export class MessageRes<T extends MessageDataTypes> {
  type: EMessageTypes;

  id: number = 0;

  data: T;

  constructor(type: EMessageTypes, data: T) {
    this.type = type;
    this.data = data;
  }

  toJSON(): string {
    return JSON.stringify({
      ...this,
      data: JSON.stringify(this.data),
    });
  }
}

export type MessageDataTypes =
  | RegDataReq
  | RegDataRes
  | UpdateWinnersRes
  | RoomsDataRes
  | GameDataRes
  | StartGameRes
  | TurnRes
  | string;

export type RegDataReq = {
  name: string;
  password: string;
};

export type RegDataRes = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

export type UpdateWinnersRes = Winner[];

export type RoomsDataRes = Room[];

export type AddUserToRoomReq = {
  indexRoom: string;
};

// TODO: use game entity model?
export type GameDataRes = {
  idGame: string;
  idPlayer: string;
};

export type GameAddShipsReq = {
  gameId: string;
  ships: Ship[];
  indexPlayer: string;
};

export type StartGameRes = {
  ships: Ship[];
  currentPlayerIndex: string;
};

export type TurnRes = {
  currentPlayer: string;
};
