import type { PaginationOption } from "../../types";
import { User } from "../../domain/account/user.interface";

export interface UserRepository {
  findAll: (pagination?: PaginationOption) => User[];
  findByActivated: (pagination?: PaginationOption) => User[];
  findMe: () => User;
  save: (user: User) => void;
  delete: (userId: string) => void;
}
