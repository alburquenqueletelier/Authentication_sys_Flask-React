import React, {useContext, useState} from "react";
import { Navigate, useNavigate  } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const [user, setUser] = useState('');
	const [passUser, setPassUser] = useState('');
	const navigate = useNavigate();

	const submitLogin = (e) => {
		e.preventDefault();
		if (!user || !passUser){
			alert('Debes ingresar un usuario y password');
			return false;
		}
		let data = {
			username: user,
			password: passUser
		}
		
		actions.login(data);
		return false;
	}

	return (
		<nav className="navbar navbar-light bg-light">
			{!store.loginuser &&
			<div className="container-fluid mb-1">
				<form className="d-flex" onSubmit={(e)=> submitLogin(e)}>
					<input onChange={(e)=>setUser(e.target.value)} type="text" className="form-control me-2" id="inlineFormInputName2" placeholder="Enter username or email"/>
					<input onChange={(e)=>setPassUser(e.target.value)} type="password" className="form-control me-2" id="inlineFormInputGroupUsername2" placeholder="Password"/>
					<button type="submit" className="btn btn-primary">Submit</button>
			  	</form>
				  </div>
			}
			{store.loginuser &&
			 <div className="container-fluid">
				<div className="d-flex">
				<p className="navbar-brand d-inline-block">{store.loginuser.username} <button className="btn btn-secondary" type="button" onClick={()=>actions.logout()}>Logout</button></p>
				</div>
			 </div>
			}
			<div className="row ms-3">
				<button className="navbar-brand btn btn-warning" onClick={()=>actions.showMsg()}>Solo funciono si estás autentificado</button>
			</div>
		</nav>
	);
};
