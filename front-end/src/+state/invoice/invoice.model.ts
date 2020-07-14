import { BaseEntityV1 } from 'src/core/src';

export interface Invoice extends BaseEntityV1 {
  firstName: string;
  lastName: string;
  products: any[];
  address: string;
  city: string;
  email: string;
  phone: string;
  note: string;
}
