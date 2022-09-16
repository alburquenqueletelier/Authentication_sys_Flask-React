import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      loginuser: null,
      token: null,
      alerta: false,
    },
    actions: {
      setalert: () => {
        const {alerta} = getStore();
        if (alerta){
          setStore({alerta:false})
        }
      },
      login: (userinfo) => {
        const {setalert} = getActions();
        setalert();
        fetch(process.env.BACKEND_URL + "/api/token", {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          method: "POST",
          body: JSON.stringify(userinfo),
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            if (data.msg) {
              console.log(data.msg);
              setStore({alerta:data.msg})
            } else {
              sessionStorage.setItem("loginuser", JSON.stringify(data.user));
              sessionStorage.setItem("token", JSON.stringify(data.token));
              return setStore({
                loginuser: data.user,
                token: data.token,
              });
            }
          })
          .catch((error) => console.log(error));
        return false;
      },
      loginRemember: () => {
        let loginuser = JSON.parse(sessionStorage.getItem("loginuser"));
        let token = JSON.parse(sessionStorage.getItem("token"));
        return setStore({
          loginuser: loginuser,
          token: token,
        });
      },
      logout: () => {
        sessionStorage.removeItem("loginuser");
        sessionStorage.removeItem("token");
        return setStore({ loginuser: null, token: null });
      },
      signup: (data) => {
        const { login } = getActions();
        let info = {
          username: data.username,
          password: data.password,
        };
        fetch(process.env.BACKEND_URL + "/api/signup", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((resp) => resp.json())
          .then((data) => {
            // alert(JSON.stringify(data))
            if (!data.Error) {
              return login(info);
            }
            return false;
          })
          .catch((error) => console.log(error));

        return false;
      },

      showMsg: () => {
        const { token } = getStore();
        // console.log(token);
        if (!token) {
          return console.log("No te has autenticado");
        }
        fetch(process.env.BACKEND_URL + "/api/hello", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            if (data.msg) return alert(data.msg);
          });
      },
    },
  };
};

export default getState;
