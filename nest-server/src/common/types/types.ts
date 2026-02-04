import { Role } from '../custom-decorators/roles';

export type EncryptedUser = {
  email: string;
  password: string;
  role: Role;
};
