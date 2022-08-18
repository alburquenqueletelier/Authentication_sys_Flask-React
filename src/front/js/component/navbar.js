import React, {useContext, useState} from "react";
import { Navigate  } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const [user, setUser] = useState('');
	const [passUser, setPassUser] = useState('');

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
			<div className="container">
				<form className="row" onSubmit={(e)=> submitLogin(e)}>
					<div className="col-auto">
						<label className="sr-only" htmlFor="inlineFormInputName2">Username/Email</label>
						<input onChange={(e)=>setUser(e.target.value)} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Enter username or email"/>
					</div>
					<div className="col-auto">
						<label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
						<div className="input-group mb-2 mr-sm-2">
							<input onChange={(e)=>setPassUser(e.target.value)} type="password" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Password"/>
						</div>
					</div>
					<div className="col-auto">
						<button type="submit" className="btn btn-primary mb-2">Submit</button>
					</div>
			  	</form>
			</div>
			}
			{store.loginuser &&
			 <div className="row justify-content-end">
				<div className="col-4">
					<button className="text-center" type="button" onClick={()=>actions.logout()}>Logout</button>
				</div>
			 </div>
			}
		</nav>
	);
};
