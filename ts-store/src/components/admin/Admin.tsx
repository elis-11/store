import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Users } from "../users/Users";
import { Products } from "./Products";
import "./Admin.scss";


export const Admin = () => {
  const navigate= useNavigate();

  
  return (
    <div className="Admin">
      <div className="links">
        <div>
          <NavLink to="" end>Products</NavLink>
        </div>
        <div>
          <NavLink to="users">
            Users
          </NavLink>
        </div>
      </div>
      <Routes >
        <Route path="/" element={<Products/>}/>
        <Route path="/users" element={<Users/>}/>
      </Routes>
    </div>
  );
};
