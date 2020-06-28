export interface BaseEntity {
  id: string;
  createdBy?: any;
  createdAt: Date;
  updatedBy?: any;
  updatedAt: Date;
}

export interface BaseEntityV1 {
  id: number;
  createdBy?: any;
  createdAt: Date;
  updatedBy?: any;
  updatedAt: Date;
}