import { randomUUID } from 'crypto';
import { GameAttackReq, RoomUser, Ship } from '.';
import {
  generateBattleField,
  getIsShipKilled,
  // getIsShipKilled
} from '../utils';

export enum EAttackStatus {
  miss = 'miss',
  killed = 'killed',
  shot = 'shot',
}

export type Position = {
  x: number;
  y: number;
};

export enum EBattleFieldPointType {
  empty = 'empty',
  shipPart = 'ship_part',
  shot = 'shot',
  miss = 'miss',
  killed = 'killed',
}

export type BattleFieldPoint = Position & {
  type: EBattleFieldPointType;
  direction: boolean;
  length: number;
  startPosition: Position;
};

export type BattleField = BattleFieldPoint[][];

export interface IPlayerData {
  playerId: string;
  ships: Ship[];
  battleField: BattleField;
}

export class PlayerData implements IPlayerData {
  playerId: string;
  ships: Ship[] = [];

  battleField: BattleField = [];

  constructor(playerId: string) {
    this.playerId = playerId;

    this.battleField = generateBattleField();
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

  private setNextTurn(): void {
    if (this.playerTurn === 0) {
      this.playerTurn = 1;
    } else {
      this.playerTurn = 0;
    }
  }

  doAttack(attackData: GameAttackReq): BattleFieldPoint {
    const enemyBattleField: BattleField =
      this.playerTurn === 0
        ? this.playersData[1].battleField
        : this.playersData[0].battleField;

    const battleFieldTarget: BattleFieldPoint =
      enemyBattleField[attackData.y][attackData.x];

    let attackResult: BattleFieldPoint = {
      type: EBattleFieldPointType.miss,
      x: attackData.x,
      y: attackData.y,
      // TODO: make direction and length optional
      direction: false,
      length: 0,
      startPosition: { x: 0, y: 0 },
    };

    console.log('battleFieldTarget.type: ', battleFieldTarget);

    switch (battleFieldTarget.type) {
      case EBattleFieldPointType.empty:
        battleFieldTarget.type = EBattleFieldPointType.miss;
        attackResult.type = EBattleFieldPointType.miss;

        this.setNextTurn();
        break;

      case EBattleFieldPointType.shipPart:
        battleFieldTarget.type = EBattleFieldPointType.shot;
        attackResult.type = EBattleFieldPointType.shot;

        const isShipKilled = getIsShipKilled(
          enemyBattleField,
          battleFieldTarget,
        );

        if (isShipKilled) {
          battleFieldTarget.type = EBattleFieldPointType.killed;
          attackResult.type = EBattleFieldPointType.killed;
        }
        break;

      default:
        // battleFieldTarget.type = battleFieldTarget.type;
        // attackResult.type = battleFieldTarget.type;
        break;
    }

    return attackResult;
  }
}
