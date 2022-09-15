import { Navigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";

type Props = {
  children: JSX.Element;
  admin?: boolean;
};

export const ProtectedRoute = ({ children, admin = false }: Props) => {
  console.log(children);

  const { user } = useDataContext();

  if (!user) {
    console.log("Not logged in!");
    return <Navigate to={"/login"} />;
  }
  if (admin && user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return children;
};
