import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { loadUserInLocalStorage } from "../helpers/LocalStorage";
import { IProduct } from "../types/product.types";
import { IContextData, IUser } from "../types/user.types";

//! Cart-vers
let initialState = {
  items: [],
  totalPrice: 0,
};

const savedCartState = localStorage.getItem("updatedCartState");
if (savedCartState !== null) {
  initialState = JSON.parse(savedCartState);
}
console.log(savedCartState);
const cartReduser = (state: any, action: any) => {
  if (action.type === "ADD") {
    console.log(action);
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;

    const index = state.items.findIndex((item: IProduct) => item._id === action.item._id);
    const existingItem = state.items[index];
    let updatedItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];

      updatedItems[index] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedCartState = {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
    localStorage.setItem("updatedCartState", JSON.stringify(updatedCartState));
    return updatedCartState;
  }
  if (action.type === "REMOVE") {
    console.log(action);
    const existingCartItemIndex = state.items.findIndex(
      (item: IProduct) => item._id === action.id
    );
    console.log(existingCartItemIndex);
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalPrice = state.totalPrice - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item: IProduct) => item._id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    const updatedCartState = {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
    localStorage.setItem("updatedCartState", JSON.stringify(updatedCartState));
    return updatedCartState;
  }
  return initialState;
};
//! Cart-end

const DataContext = createContext<IContextData>({} as IContextData);

export const useDataContext = () => useContext(DataContext);

type Props = {
  children: ReactNode;
};

export const DataProvider = ({ children }: Props) => {
  const userLs = loadUserInLocalStorage();

  const [user, setUser] = useState<IUser | undefined>(userLs);
  const [users, setUsers] = useState<IUser[]>([]);
  const [errors, setErrors] = useState<string>("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cartState, dispatchCartAction] = useReducer(cartReduser, initialState);

  const addToCart = (item: IProduct)=>{
    dispatchCartAction({type: "ADD", item: {...item, amount:1}})
  }

  const removeFromCart=(id: string)=>{
    dispatchCartAction({type: "REMOVE", id: id})
  }

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        errors,
        setErrors,
        products,
        setProducts,
        items: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addToCart,
        removeItem: removeFromCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
