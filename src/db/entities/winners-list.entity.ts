import { Winner } from '../../models';

export class WinnersList {
  private winners: Winner[] = [];

  private sortWinners(): void {
    this.winners = this.winners.sort((a, b) => b.wins - a.wins);
  }

  addWinner(newWinner: Winner): void {
    const existingWinnerIndex: number = this.winners.findIndex(
      (winner: Winner) => winner.name === newWinner.name,
    );

    if (existingWinnerIndex !== -1) {
      this.winners[existingWinnerIndex] = newWinner;
    } else {
      this.winners.push(newWinner);
    }

    this.sortWinners();
  }

  getAllWinners(): Winner[] {
    return this.winners;
  }
}
