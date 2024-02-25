import { randomUUID } from 'crypto';

export interface IUser {
  index: string;
  name: string;
  password: string;
}

export class User implements IUser {
  index: string = '';

  name: string = '';

  password: string = '';

  constructor(user: Partial<User>) {
    // TODO: validate
    Object.assign(this, user);

    this.index = randomUUID();
  }
}
