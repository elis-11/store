import { NavLink, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { deleteUserInLocalStorage } from "../helpers/LocalStorage";
import { MdLogout } from "react-icons/md";
import { IProduct, ICartItem } from "../types/product.types";
import { IContextData } from "../types/user.types";
import Badge from "@mui/material/Badge";
// import { red } from '@mui/material/colors';

// const primary = red[50];


export const Navbar = () => {
  const context: IContextData = useDataContext();
  const { user, setUser, products } = useDataContext();

  //!
  const numberOfItems = context.items.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.amount;
  }, 0);

  const navigate = useNavigate();

  const logout: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    deleteUserInLocalStorage();
    setUser(undefined);
    navigate("/login");
  };

  return (
    <div className="Navbar">
      {/* <div className="logo">{user && <NavLink to="/">Store</NavLink>}</div> */}
      <div className="logo">
        <NavLink to="">Cake Store</NavLink>
      </div>
      <div className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/signup">Signup</NavLink>}
        {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        {user && (
          <NavLink to="#" onClick={logout}>
            <MdLogout />
          </NavLink>
        )}
      </div>

      <div className="images">
        <NavLink to="/cart" className='ml-1'>
          <Badge badgeContent={numberOfItems} color='secondary' >
            <img className="bag" src="/images/bag12.png" alt="bag" />
          </Badge>
        </NavLink>
        {user && (
          <NavLink to="/">
            <img className="avatar" src={user.avatar} />
          </NavLink>
        )}
      </div>
    </div>
  );
};
