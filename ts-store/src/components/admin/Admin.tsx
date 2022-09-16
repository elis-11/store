import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Users } from "../users/Users";
import { Products } from "./Products";

export const Admin = () => {
  const navigate= useNavigate();

  
  return (
    <div className="Admin">
      <div className="links">
        <div>
          <NavLink to="" end>
            Users
          </NavLink>
        </div>
        <div>
          <NavLink to="products">Products</NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Users/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </div>
  );
};
