import { NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { deleteUserInLocalStorage } from "../helpers/LocalStorage";
import { MdLogout } from "react-icons/md";

export const Navbar = () => {
  const { user, setUser } = useDataContext();

  const navigate = useNavigate();

  const logout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    deleteUserInLocalStorage();
    setUser(undefined);
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div className="logo">{user && <NavLink to="/">Store</NavLink>}</div>
      <div className="nav">
        <NavLink to="/">Products</NavLink>
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/signup">Signup</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        {user && (
          <NavLink to="#" onClick={logout}>
            <MdLogout />
          </NavLink>
        )}
      </div>
      <div className="avatar">
        {user && (
          <NavLink to="/">
            <img src={user.avatar} />
          </NavLink>
        )}
      </div>
    </div>
  );
};
