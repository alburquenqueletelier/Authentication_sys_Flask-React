import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, Link } from "react-router-dom";
import { Modal } from "../component/modal"

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!!store?.loginuser) {
      setRedirect("");
    } else {
      setRedirect(<Navigate to="/" />);
    }
  }, [store?.loginuser]);

  return (
    <div className="container-fluid text-center mt-3">
      {!!store?.loginuser ? (
        <div>
          <h1 className="text-primary bg-dark p-1">Esta es tu sección privada</h1>
          <h4 className="mt-4">
            La pagina usa <strong>JWT</strong> para autenticación.
          </h4>
          <figure className="text-center m-4">
            <blockquote className="blockquote">
              <p>"JSON Web Token (JWT) es un estándar abierto (RFC-7519) basado en JSON para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros. El caso más común de uso de los JWT es para manejar la autenticación en aplicaciones móviles o web"</p>
            </blockquote>
            <figcaption className="blockquote-footer">
              <cite title="Source Title">https://platzi.com/blog/introduccion-json-web-tokens/</cite>
            </figcaption>
          </figure>

          <Modal/>

          <h5 className="mt-2">
            Si quieres saber más de esta herramienta puedes visitar el sitio oficial en{" "}
            <a href="https://jwt.io/" target="blank">https://jwt.io/</a>
          </h5>
          <p>
            Presiona{" "}
            <Link to="/" className="btn btn-warning">
              Aqui
            </Link>{" "}
            para volver a la pagina principal
          </p>
        </div>
      ) : (
        redirect
      )}
    </div>
  );
};
