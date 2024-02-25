import { UserRepository } from './entities';

export class AppDataBase {
  private static instance: AppDataBase;

  static getInstance(): AppDataBase {
    if (!this.instance) {
      this.instance = new AppDataBase();
    }
    return this.instance;
  }

  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
}

export const AppDB: AppDataBase = AppDataBase.getInstance();
