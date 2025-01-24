import { useEffect } from "react";
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import ProfilePage from "../Components/ProfilePage/ProfilePage"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  useEffect(()=>{
    console.log('-----------------------------------------------------------------------------------------------')
 console.log('---------------------------------Profile page UseEffect--------------------------------------------------------------');
 
 
          if (!isAuthenticated) {
        
          navigate('/login');
          }
    
  },[isAuthenticated,dispatch,navigate])
  return (
    <div>
      <Navbar></Navbar>
      <ProfilePage></ProfilePage>
      <Footer></Footer>
    </div>
  )
}

export default Profile
