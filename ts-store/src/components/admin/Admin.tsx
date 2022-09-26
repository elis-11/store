import { NavLink, Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";
import { Cart } from "../cart/Cart";
import { Products } from "../product/Products";

export const Admin = () => {

  return (
    <div className="Admin">
      <div className="links">
        <div>
          <NavLink to="">Products</NavLink>
        </div>
        <div>
          <NavLink to="users">Users</NavLink>
        </div>
        <div>
          <NavLink to="cart">Cart</NavLink>
        </div>
      </div>
      <Routes>
        <Route path="" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
};
