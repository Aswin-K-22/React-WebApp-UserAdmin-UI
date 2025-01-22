import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import SignUpForm from "../Components/SignUpForm/SignUpForm"

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/user/is-authenticated', { withCredentials: true });
                if (response.data.isAuthenticated) {
                    navigate('/'); // Redirect if already authenticated
                } else {
                    setIsLoading(false); // Allow login form to render
                }
            } catch (error) {
                if (error.response?.status === 401) {
                    // Handle unauthorized access silently
                    console.warn('User not authenticated');
                } else {
                    console.error('Error fetching user:1', error.response?.data?.message || error.message);
                }
               
                
                setIsLoading(false); // 
                setIsLoading(false); // Allow login form to render if not authenticated
            }
        };
        checkAuth();
    }, [navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loader while checking auth
    }

  return (
    <div>
      <Navbar></Navbar>
      <SignUpForm></SignUpForm>
      <Footer></Footer>  
    </div>
  )
}

export default SignUp
