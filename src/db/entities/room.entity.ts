import { Room, User } from '../../models';

export class RoomRepository {
  private rooms: Room[] = [];

  findAll(): Room[] {
    // TODO: add number to constants
    return this.rooms.filter((room) => room.roomUsers.length < 2);
  }

  addUserToRoom(roomId: string, user: User): Room | null {
    const roomIndex: number = this.rooms.findIndex(
      (room) => room.roomId === roomId,
    );

    const room: Room = this.rooms[roomIndex];

    if (roomIndex !== -1 && room.roomUsers.length < 2) {
      room.roomUsers.push(user);
      return room;
    } else {
      return null;
    }
  }

  create(): void {
    const room = new Room();

    this.rooms.push(room);
  }
}
