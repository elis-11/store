import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { loginApi } from "../../helpers/ApiCalls";
import { storeUserInLocalStorage } from "../../helpers/LocalStorage";
import './Signup.scss';

export const Login = () => {
  const { setUser, errors, setErrors } = useDataContext();

  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onLoginSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Login at API...");

    const email = refEmail?.current?.value;
    const password = refPassword?.current?.value;

    if (!email || !password) {
      setErrors("HEYY! Email und Passwort vergessen? Jetzt aber!");
      return;
    }

    // Login against API
    const result = await loginApi(email, password);
    console.log(result);

    if (result.error) {
      return setErrors(result.error);
    }
    setErrors("");
    storeUserInLocalStorage(result);
    setUser(result);
    navigate("/users");
  };
  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={onLoginSubmit}>
        <div>
          <input
            type="text"
            ref={refEmail}
            defaultValue="elis@gmail.com"
            placeholder="Email..."
          />
        </div>
        <div>
          <input
            type="password"
            ref={refPassword}
            defaultValue="elis"
            placeholder="Password..."
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};
