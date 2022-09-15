import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getUsersApi } from "../../helpers/ApiCalls";
import './Users.scss'

export const Users = () => {
  const navigate = useNavigate();

  const { user, users, setUsers, errors, setErrors } = useDataContext();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    const loadData = async () => {
      const result = await getUsersApi(user.token);
      if (result.error) {
        return setErrors(result.error);
      }
      setErrors("");
      setUsers(result);
    };
    console.log(user);
    loadData();
  }, [user]);

  return (
    <div className="User">
      <h2>
        {users.length} {users.length === 1 ? "User" : "Users"}
      </h2>
      <div className="users">
        {users.map((user) => (
          <div className="user" key={user._id}>
            <div className="avatar">
              <img src={user.avatar} />
            </div>
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
        ))}
      </div>
      <div className="errors">{errors}</div>
    </div>
  );
};
