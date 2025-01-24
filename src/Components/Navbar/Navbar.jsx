import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios';
import { clearUser } from '../../Store/slices/authSlice';
import defaultProfilePic from '../../assets/Default_pfp.jpg'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user  } = useSelector((state) => state.auth);


  const handleLogout = async () => {
    try {
        await axios.post('/user/logout', {}, { withCredentials: true });
        dispatch(clearUser());
        navigate('/login');
    } catch (error) {
        console.error('Error logging out:', error.response?.data?.message || error.message);
    }
};


  console.log(defaultProfilePic); // Should log the URL/path to the image
  console.log('----------------------------------------NAVBAR -Component----------------------------------------------------------');
  console.log('--------------------------------------------------------------------------------------------------'); 
  console.log('--------------------------------------------------------------------------------------------------'); 

  console.log('isUser Authenticated :', isAuthenticated);
  console.log('User ', user);
  

  const handleProfileClick = () => {
    if(isAuthenticated){
      navigate('/profile');

    }else{
      navigate('/login')
    }
  };

  return (
      <nav className="navbar">
          <div className="navbar-container">
              <Link to="/" className="navbar-logo">MyApp</Link>
              <ul className="navbar-links">
                  <li>
                      <span>Welcome, {user?.name || 'Guest'}</span>
                  </li>
                  {!isAuthenticated ? (
                      <>
                          <li>
                              <Link to="/login">Login</Link>
                          </li>
                          <li>
                              <Link to="/signup">Register</Link>
                          </li>
                      </>
                  ) : (
                    <>
                     
                      <li>
                <div className="profile-icon" onClick={handleProfileClick}>

                  {user?.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt="Profile"
                          className="profile-pic"
                        />
                      ) : (
                        <img
                          src={defaultProfilePic}
                          alt="Profile"
                          className="profile-pic"
                        />
                      )}

                      
                 
                </div>
              </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                      </>
                  )}
              </ul>
          </div>
      </nav>
  );
};

export default Navbar;

