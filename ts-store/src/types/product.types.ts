import { IUser } from "./user.types";

export interface IProduct {
  _id: string;
  name: string;
  author?: IUser;
  description?: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
}

export interface IProductCreate {
  name: string;
  author?: string;
  description?: string;
  price?: number;
  image?: string;
}

export interface IProductUpdate {
  name?: string;
  author?: string;
  description?: string;
  price?: number;
  image?: string;
}

export interface ICartItem {
  product: IProduct;
  amount: number;
}

