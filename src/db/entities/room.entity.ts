import { IBaseRepository } from '.';
import { Room } from '../../models';

export class RoomRepository implements IBaseRepository<Room> {
  private rooms: Room[] = [];

  findAll(): Room[] {
    return this.rooms;
  }

  create(): void {
    const room = new Room();

    this.rooms.push(room);
  }
}
