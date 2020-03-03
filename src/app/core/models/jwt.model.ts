import {RoleModel} from "./role.model";

export interface JwtModel {
  user: string;
  roles: RoleModel[];
  expAt: Date;

}
