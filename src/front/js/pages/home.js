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
		<div className="text-center mt-5">
			{!!store.loginuser ?
			<div>
			<h1>Bienvenido {store.loginuser?.username} !</h1>
			<p>Estas usando un token para identificarte que se borrara cuando hagas logout o cierres la pestaña</p>
			<p>Pincha este <Link to="/private" className="btn btn-secondary">Boton</Link> para dirigirte a la seccion privada</p>
			</div>
			
			
			:<div>
			<h1>Registrate o has login</h1>
			<form onSubmit={(e)=>submitSignup(e)}>
				<input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)}></input>
				<input type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)}></input>
				<input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}></input>
				<input type="password" placeholder="repeat password" onChange={(e)=>setPassword2(e.target.value)}></input>
				<br></br>
				<button type="submit">Enviar</button>
			</form>
		</div>
			}
		</div>
	);
};
