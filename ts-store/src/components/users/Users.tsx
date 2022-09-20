import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { getUsersApi } from "../../helpers/ApiCalls";
import "./Users.scss";

export const Users = () => {
  const { user, users, setUsers, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="User">
      <h2>
        {users.length} {users.length === 1 ? "User" : "Users"}
      </h2>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            autoFocus
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{width: "30rem", height: "2rem", paddingLeft: "1rem", background: "transparent"}}
          />
        </form>
      </div>
      <div className="users">
        {filteredUsers.map((user) => (
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
