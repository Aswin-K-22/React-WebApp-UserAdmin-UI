import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from '../../Store/slices/authSlice';
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


  useEffect(() => {
    console.log("Navbar fetching chekcing 'isAuthenticated' =",isAuthenticated)
      if (!isAuthenticated) {
          dispatch(fetchUser());
      }
  }, [dispatch, isAuthenticated]);

  const handleProfileClick = () => {
    navigate('/profile');
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
                          src={`${import.meta.env.VITE_API_BASE_URL}${user.profilePhoto}`}
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

