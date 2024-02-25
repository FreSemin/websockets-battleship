import { RoomRepository, UserRepository } from './entities';

export class AppDataBase {
  private static instance: AppDataBase;

  static getInstance(): AppDataBase {
    if (!this.instance) {
      this.instance = new AppDataBase();
    }
    return this.instance;
  }

  userRepository: UserRepository;

  roomRepository: RoomRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.roomRepository = new RoomRepository();
  }
}

export const AppDB: AppDataBase = AppDataBase.getInstance();
