import {IUser} from './user.types'

export interface IProduct {
_id: string;
name: string;
description?: string;
price: number;
image?: string;
}

export interface IProductCreate {
    name: string;
    description?: string;
    price: number;
    image?: string;
    }

export interface IProductUpdate {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    }

    

