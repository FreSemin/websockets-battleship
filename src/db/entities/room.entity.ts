import { IBaseRepository } from '.';
import { Room } from '../../models';

export class RoomRepository implements IBaseRepository<Room> {
  private rooms: Room[] = [];

  findAll(): Room[] {
    // TODO: add number to constants
    return this.rooms.filter((room) => room.roomUsers.length < 2);
  }

  create(): void {
    const room = new Room();

    this.rooms.push(room);
  }
}
