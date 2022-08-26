import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center border-top border-secondary">
		<p className="m-0">Created By: <strong>Bryan Alburquenque</strong></p>
		<div className="row justify-content-center">
			<div className="col-auto">
				<a href="https://wa.me/56979577547" target="blank">
					<img width="25px" className="mt-2 me-3" src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="logo-whatsapp"/>
					</a>
			</div>
			<div className="col-auto">
				<a href="https://www.linkedin.com/in/alburquenque-letelier/" className="btn" target="_blank">
					<img width="25px" src="https://cdn-icons-png.flaticon.com/512/3938/3938061.png" alt="Linkedin" /> 
				</a>
			</div>
			<div className="col-auto">
				<a href="https://github.com/alburquenqueletelier" className="btn" target="_blank">
					<img width="25px" src="https://cdn-icons-png.flaticon.com/512/270/270798.png" alt="Github" /> 
				</a>
			</div>
			<div className="col-auto">
			<a href="https://instagram.com/baal_sw/?hl=en" target="blank">
				<img width="25px" className="mt-2 ms-2" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="https://www.instagram.com/baal_sw/?hl=en" />
			</a>
			</div>
		</div>
	</footer>
);
