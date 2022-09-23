import { IUser } from "./user.types";

export interface IProduct {
  _id: string;
  name: string;
  author?: IUser;
  description?: string;
  price?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCreate {
  name: string;
  author: string;
  description?: string;
  price?: string;
  image?: string;
}

export interface IProductUpdate {
  name?: string;
  description?: string;
  price?: string;
  image?: string;
}
