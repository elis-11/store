import { createContext, ReactNode, useContext, useState } from "react";
import { loadUserInLocalStorage } from "../helpers/LocalStorage";
import { IProduct } from "../types/product.types";
import { IContextData, IUser } from "../types/user.types";

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

//   // cart will holt an array of products
//   const [cart, setCart] = useState<IProduct[]>([]);

//   // calculate totals
//   const cartTotal = () => {
//     let sum = cart.reduce((sum, item) => {
//       return sum + item.quantity * item.price;
//     }, 0);
//     return round(sum);
//   };

//   const updateQuantity = (productId: string, quantityNew: string) => {
//     let cartUpdated = cart.map((product) => {
//       if (product._id === productId) {
//         product.quantity = quantityNew;
//       }
//       return product;
//     });
//     setCart(cartUpdated);
//   };

//   const deleteItem= (productId: string)=>{
//     let cartUpdated=cart.filter(product =>{
//       product._id !== productId)
//       setCart(cartUpdated);
//     }
//   }
// // add product to the cart state array
//   const addProductToCart = (product: IProduct) => {
//     let cartItems = [...cart];
//     console.log(productItems);

//     // check if item already in cart
//     let cartItemFound=cartItems.find(item => item.id === product._id);

//     // if found => increase quantity by one
//     if(cartItemFound) {
//       cartItemFound.quantity++;
//       setCart(cartItems)
//     }

//     // if not found - add item with quantity 1
//     else {
//       let cartItemNew={...product, quantity:1}
//       cartItems.push(cartItemNew);
//       setCart(cartItems)
//     }
//   };

  const sharedData = {
    user,
    setUser,
    users,
    setUsers,
    errors,
    setErrors,
    products,
    setProducts,
    // cart,
    // setCart,
    // addProductToCart,
    // updateQuantity,
    // deleteItem,
    // cartTotal,
  };

  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};
