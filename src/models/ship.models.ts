import { Position } from '.';

export type ShipType = 'small' | 'medium' | 'large' | 'huge';

export type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};
