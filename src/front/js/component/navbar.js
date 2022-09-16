import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState("");
  const [passUser, setPassUser] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    if (!user || !passUser) {
      return false;
    }
    let data = {
      username: user,
      password: passUser,
    };

    actions.login(data);
    return false;
  };

  useEffect(() => {});

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid mb-1">
        {!store.loginuser && (
          <form className="d-flex" onSubmit={(e) => submitLogin(e)}>
            <input
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="form-control me-2"
              id="inlineFormInputName2"
              placeholder="Enter username or email"
            />
            <input
              onChange={(e) => setPassUser(e.target.value)}
              type="password"
              className="form-control me-2"
              id="inlineFormInputGroupUsername2"
              placeholder="Password"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}

        {store.loginuser && (
          <div className="row text-center align-items-center justify-content-center">
            <div className="col-auto text-primary" style={{"font-weight": "bold"}}>{store.loginuser.username} </div>
            <div className="col-auto">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => actions.logout()}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <button className="btn btn-warning" onClick={() => actions.showMsg()}>
          Solo funciono si estás autentificado
        </button>

        {!!store?.alerta && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <div>{store.alerta}</div>
          </div>
        )}
      </div>
    </nav>
  );
};
