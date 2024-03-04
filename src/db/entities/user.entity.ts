import { User } from '../../models';

export class UserRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: string): User | null {
    return this.users.find((user) => user.index === id) || null;
  }

  create(newUser: Partial<User>): User {
    const existingUser = this.users.find((user) => newUser.name === user.name);

    if (existingUser && existingUser.password !== newUser.password) {
      throw new Error('Wrong Password!');
    } else {
      if (
        (newUser.name && newUser.name?.length < 5) ||
        (newUser.password && newUser.password?.length < 5)
      ) {
        throw new Error('Not valid User Input! Min length is 5!');
      }

      const user: User = new User(newUser);

      this.users.push(user);

      return user;
    }
  }
}
