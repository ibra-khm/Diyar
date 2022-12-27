import React, { useState } from "react";
// import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Login from "../components/Login";
import Register from "../components/Register";



export default function Registration() {
	const [hasAccount, setHasAccount] = useState(false);
	return (
		// <div className="container h-full flex max-w-screen justify-center mx-auto p-5 lg:p-10">
			
		// </div>
		<>
		<div className="w-screen xl:1/4 -mr-12 z-10 h-[93%] self-center lg:flex justify-center">
				<img
					
					className="object-cover self-center w-11/12 xl:w-10/12"
				/>
			</div>
			<div className="w-full flex flex-col justify-center items-center">
				{hasAccount ? <Login /> : <Register />}
				<div className="flex  w-1/2 my-2 text-sm font-semibold items-center text-gray-800">
					<div className="flex-grow border-t h-px mr-3"></div>
					OR
					<div className="flex-grow border-t h-px ml-3"></div>
				</div>
				<p className="text-xs pt-3">
					{!hasAccount ? "Already have " : "Do not have "} an account?{" "}
					<button
						className="text-grape underline"
						onClick={() => setHasAccount(!hasAccount)}
					>	
						{" "}
						{!hasAccount ? "Login" : "Register"}{" "}
					</button>
				</p>
			</div></>
	);
}
