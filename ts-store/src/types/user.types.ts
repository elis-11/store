import {IProduct} from './product.types'

export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    token: string;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role?: string;
}

export interface IUserUpdate {
    _id: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    role?: string;
}

export type IContextData ={
    user: IUser | undefined
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
    users: IUser[]
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
    errors:string
    setErrors: React.Dispatch<React.SetStateAction<string>>
    products: IProduct[]
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>
    // item: IProduct[]
    // items: IProduct[]
    // totalPrice: React.Dispatch<React.SetStateAction<IProduct[]>>
    // addToCart: React.Dispatch<React.SetStateAction<IProduct[]>>
    // removeFromCart: React.Dispatch<React.SetStateAction<IProduct[]>>
}