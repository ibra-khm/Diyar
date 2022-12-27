import React, {useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authcontext'
// import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
// import jwtDecode from 'jwt-decode'
import Router from 'next/router'

export default function GoogleAuth() {
    // const { user, setUser, setCookie} = useContext(AuthContext);
    // const navigate = useNavigate();

    const googleResponse = (response) => {
        console.log(response);
        const userObject = jwtDecode(response.credentials);
        localStorage.setItem('user', JSON.stringify(userObject));
        const {name, sub, picture, email} = userObject;
        console.log(userObject);
        const data = {
            name: name,
            email: email,
            google_id: sub,
            avatar: picture,

        };
        axios.post('/sanctum/csrf-cookie').then((response) => {
            axios.post('/api/googleLogin', data).then((res) => {
                if (res.data.status === "Request successful") {
                    console.log(res.data);
                    const name = res.data.data.user.name;
                    const email = res.data.data.user.email;
                    const token = res.data.data.token;
                    setCookie('Token', token, {path: '/'});
                    setUser({... user, name, email});
                    Router.push('/', {replace: true});

                } else {
                    console.log(res);
                }
            });
        });
    }



    // return (
    //     // <GoogleLogin onSuccess={googleResponse} onError={() => {
    //     //     console.log('Error');
    //     // }} useOneTap />
    // );
}