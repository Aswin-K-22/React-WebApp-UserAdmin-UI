import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from "../Components/Footer/Footer"
import LoginForm from "../Components/LoginForm/LoginForm"
import Navbar from "../Components/Navbar/Navbar"
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Store/slices/authSlice';


const Login = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

useEffect(() => {
        if (isAuthenticated) {
            
            navigate('/');
        }else{
             dispatch(fetchUser())
        }
        console.log('USER -Login  page -useEffect',isAuthenticated);

    }, [isAuthenticated, navigate,dispatch]); 

  return (
    <div>
        <Navbar></Navbar>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </div>
  )
}

export default Login
