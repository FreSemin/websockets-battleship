export interface IWinner {
  name: string;
  wins: number;
}

export class Winner implements IWinner {
  name: string = '';
  wins: number = 0;

  constructor(winner: Partial<Winner>) {
    Object.assign(this, winner);
  }
}
