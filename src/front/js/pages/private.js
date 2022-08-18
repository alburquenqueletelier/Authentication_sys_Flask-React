import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
		{!!store.loginuser ?
			(<div>
			<h1>Si estas viendo esto es porque hiciste login</h1>
            <h2>Hola {store.loginuser?.username}</h2>
			</div>)
			: <div>
				<h3>No tiene que verse con login</h3>
				</div>
			
		}
		</div>
		
	);
};
