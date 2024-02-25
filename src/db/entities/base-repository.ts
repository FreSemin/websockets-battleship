export interface IBaseRepository<T> {
  findAll(): T[];

  create(newEntity?: Partial<T>): T | void;
}
