import { BaseEntity } from 'src/core/src/lib/models/base-entity.model';

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