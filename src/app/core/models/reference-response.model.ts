import {IdentifiedEntity} from "./identified.entity";

export interface ReferenceResponseModel<T> {
  content: T[];
  pageable?: {};
  totalPages?: number;
  totalElements?: number;
  last?: boolean;
  number?: number;
  sort?: {};
  size?: number;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}
