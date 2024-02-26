import { IBaseRepository } from '.';
import { Room, User } from '../../models';

export class RoomRepository implements IBaseRepository<Room> {
  private rooms: Room[] = [];

  findAll(): Room[] {
    // TODO: add number to constants
    return this.rooms.filter((room) => room.roomUsers.length < 2);
  }

  addUserToRoom(roomId: string, user: User): void {
    const roomIndex: number = this.rooms.findIndex(
      (room) => room.roomId === roomId,
    );

    if (roomIndex !== -1 && this.rooms[roomIndex].roomUsers.length < 2) {
      this.rooms[roomIndex].roomUsers.push(user);
    } else {
      // TODO: throw error
    }
  }

  create(): void {
    const room = new Room();

    this.rooms.push(room);
  }
}
