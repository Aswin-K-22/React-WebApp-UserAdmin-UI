import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

import Footer from "../Components/Footer/Footer"
import LoginForm from "../Components/LoginForm/LoginForm"
import Navbar from "../Components/Navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Store/slices/authSlice';


const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

useEffect(()=>{
    const checkAdminAuthentication = async () => {
        if (!isAuthenticated) {
         dispatch(fetchUser)
        } else {
            navigate('/admin/dashboard');
        }
    };
    checkAdminAuthentication();
},[isAuthenticated])

  return (
    <div>
        <Navbar></Navbar>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </div>
  )
}

export default Login
