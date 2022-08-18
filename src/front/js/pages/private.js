import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navigate, Link } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const [redirect, setRedirect] = useState('');

	useEffect(()=>{
		if(!!store?.loginuser){
			setRedirect('');
		} else {
			setRedirect(<Navigate to="/"/>);
		}
	},[store?.loginuser])

	return (
		<div className="text-center mt-5">
			{!!store?.loginuser 
			? <div>
				<h1>Si estas viendo esto es porque hiciste login correctamente</h1>
				<h2>Hola {store.loginuser?.username}</h2>
				<p>Pincha <Link to="/" className="btn btn-warning">Aqui</Link> para volver a la pagina principal</p>
				</div>
			:redirect
			}
		</div>
		
	);
};
