import React, { useContext, useState } from "react"
import { AuthContext } from "../context/authcontext"
import axios from 'axios'
import Router from "next/router";
import swal from "sweetalert";
import { useSession, signIn } from 'next-auth/react'



export default function Login() {
  const [hasAccount, setHasAccount] = useState(false);
  // const { user, setUser, setCookie } = useContext(AuthContext);
  // const navigate = useNavigate();
  const { data: session } = useSession();
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  }

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {

      axios.post(`api/login`, data).then(res => {
        if (res.data.status === 200) {
          // console.log(res.data);
          // const name = res.data.data.user.name;
          // const email = res.data.data.user.email;
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "Success")
          Router.push('/')

          // const token = res.data.data.token;
          // setCookie('Token', token, { path: '/' });
          // setUser({...user, name, email });
          // Router.push('/', { replace: true });

        }
        else if (res.data.status === 401) {
          swal("Error", res.data.message, "Warning")

        }
        else {
          console.log(res);
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  }


  return (
    <>
      <form onSubmit={loginSubmit} class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl" >
        <p class="text-lg font-medium">Sign in to your account</p>

        <div>
          <label for="email" class="text-sm font-medium" value='Email' />

          <div class="relative mt-1">
            <input
              type="email"
              id="email2"
              name="email"
              value={loginInput.email}
              onChange={handleInput}
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
            <span>{loginInput.error_list.email}</span>

            <span class="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label for="password" class="text-sm font-medium">Password</label>

          <div class="relative mt-1">
            <input
              type="password"
              id="password"
              name="password"
              value={loginInput.password}
              onChange={handleInput}
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
            <span>{loginInput.error_list.password}</span>
            <span class="absolute inset-y-0 right-4 inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <button
          type="submit"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Login
        </button>
        <div className="flex  w-1/2 my-2 text-sm font-semibold items-center text-gray-800">
					<div className="flex-grow border-t h-px mr-3"></div>
					OR
					<div className="flex-grow border-t h-px ml-3"></div>
				</div>
        <button onClick={()=> signIn()}>Google Sign In</button>

        <div className="w-full flex flex-col justify-center items-center">
				{/* {hasAccount ? <Login /> : <Register />} */}
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
			</div>
      </form>




    </>


  )
}
