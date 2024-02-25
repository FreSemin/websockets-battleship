import { IBaseRepository } from '.';
import { User } from '../../models';

export class UserRepository implements IBaseRepository<User> {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  create(newUser: Partial<User>): User {
    const existingUser = this.users.find((user) => newUser.name === user.name);

    if (existingUser) {
      // TODO: check passwords
      return existingUser;
    } else {
      const user: User = new User(newUser);

      this.users.push(user);

      return user;
    }
  }
}
