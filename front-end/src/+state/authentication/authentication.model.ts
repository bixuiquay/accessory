import { BaseEntity } from 'src/core/src/lib/models/base-entity.model';
import { Product } from '../product';

export interface Authentication extends BaseEntity {
  user: UserInfo;
  token: string;
}

export interface UserInfo extends BaseEntity {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ClientModel extends BaseEntity {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  password: string;
  retryPassword: string;
}

export interface ChangePasswordModel extends LoginModel {
  oldPassword: string;
  confirmPassword: string;
}