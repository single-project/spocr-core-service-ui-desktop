import {RoleModel} from './role.model';

export interface AuthModel {
  token: string;
  username: string;
  roles: RoleModel[];
  expiredAt: Date;
}
