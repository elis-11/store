import { NavLink, Route, Routes } from "react-router-dom";
import { Users } from "../users/Users";
import { Products } from "./Products";

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
      </div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
};
