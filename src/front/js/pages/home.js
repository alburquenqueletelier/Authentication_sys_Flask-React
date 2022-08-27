import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const submitSignup = (e) => {
		e.preventDefault();
		if (password != password2){
			alert('Las password deben coincidir');
			return false;
		}
		let data = {
			username: username,
			email: email,
			password: password,
			is_active: false
		}
		actions.signup(data)

		return false;
	}

	return (
		<div className="container-fluid text-center mt-3">
			{!!store.loginuser ?
			<div>
			<h1 className="text-primary bg-dark p-1">Bienvenido {store.loginuser?.username} !</h1>
			<p>Estas usando un token para identificarte que se borrara cuando hagas logout o cierres la pestaña</p>
			<p>Pincha este <Link to="/private" className="btn btn-warning">Boton</Link> para dirigirte a la seccion privada</p>
			</div>
			:<div>
				<h1 className="text-primary bg-dark p-1">Autenticación con JWT y protección de vista</h1>
				<h2>Registrate o inicia sesión para acceder a tu sección privada</h2>
				<p>Puedes tratar de acceder al sitio priviado sin login al agregar /private a la url o pinchando <Link to="/private">acá</Link> pero seras redireccionado a esta pagina por no estar autentificado</p>
				<div className="row justify-content-center">
				<form className="w-50 mb-2" onSubmit={(e)=>submitSignup(e)}>
					<input className="form-control m-1" type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></input>
					<input className="form-control m-1" type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}></input>
					<input className="form-control m-1" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
					<input className="form-control m-1" type="password" placeholder="repeat password" onChange={(e)=>setPassword2(e.target.value)}></input>
					<button type="submit" className="btn btn-primary mt-1">Enviar</button>
				</form>
				</div>
			</div>
			}
		</div>
	);
};
