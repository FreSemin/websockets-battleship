import {
  EAttackStatus,
  BattleField,
  EBattleFieldPointType,
  Ship,
  BattleFieldPoint,
} from '../models';

export const generateBattleField = (): BattleField => {
  const battleField: BattleField = [];

  for (let y = 0; y <= 10; y++) {
    let x = 0;

    battleField.push([]);

    for (let i = 0; i < 10; i++) {
      // TODO: Fix and make direction and length optional
      battleField[y].push({
        x,
        y,
        type: EBattleFieldPointType.empty,
        direction: false,
        length: 0,
        startPosition: { x, y },
      });

      x += 1;
    }
  }

  return battleField;
};

export const addShipsToBattleField = (
  battleField: BattleField,
  ships: Ship[],
): BattleField => {
  ships.forEach((ship: Ship) => {
    const { x, y } = ship.position;

    if (ship.direction === false) {
      // create ship by x
      for (let i = 0; i <= ship.length - 1; i++) {
        battleField[y][i + x] = {
          x: i + x,
          y,
          type: EBattleFieldPointType.shipPart,
          direction: false,
          length: ship.length,
          startPosition: { x, y },
        };
      }
    } else {
      // create ship by y
      for (let i = 0; i <= ship.length - 1; i++) {
        battleField[i + y][x] = {
          x,
          y: i + y,
          type: EBattleFieldPointType.shipPart,
          startPosition: { x, y },
          direction: true,
          length: ship.length,
        };
      }
    }
  });
  return battleField;
};

export const getAttackStatus = (
  battleFieldPointType: EBattleFieldPointType,
): EAttackStatus => {
  let attackStatus: EAttackStatus = EAttackStatus.miss;

  switch (battleFieldPointType) {
    case EBattleFieldPointType.empty:
      break;

    case EBattleFieldPointType.miss:
      break;

    case EBattleFieldPointType.shipPart:
      attackStatus = EAttackStatus.shot;
      break;

    case EBattleFieldPointType.shot:
      attackStatus = EAttackStatus.shot;
      break;

    case EBattleFieldPointType.killed:
      attackStatus = EAttackStatus.killed;
      break;

    default:
      break;
  }

  return attackStatus;
};

export const getIsShipKilled = (
  battleField: BattleField,
  battleFieldTarget: BattleFieldPoint,
): boolean => {
  let numberOfBrokenParts = 0;

  if (battleFieldTarget.direction === false) {
    for (let i = 0; i < battleFieldTarget.length - 1; i++) {
      if (
        battleField[battleFieldTarget.startPosition.y][
          battleFieldTarget.startPosition.x + i
        ].type === EBattleFieldPointType.shot
      ) {
        numberOfBrokenParts += 1;
      }
    }
  } else {
    for (let i = 0; i < battleFieldTarget.length - 1; i++) {
      if (
        battleField[battleFieldTarget.startPosition.y + i][
          battleFieldTarget.startPosition.x
        ].type === EBattleFieldPointType.shot
      ) {
        numberOfBrokenParts += 1;
      }
    }
  }

  return numberOfBrokenParts === battleFieldTarget.length ? true : false;
};
