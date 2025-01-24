import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { clearAdmin } from '../../Store/slices/admin';
import defaultProfilePic from '../../assets/Default_pfp.jpg';
import './AdminNavbar.css';


const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdminAuthenticated , admin  } = useSelector((state) => state.admin);


  const handleLogout = async () => {
    try {
        await axios.post('/admin/logout', {}, { withCredentials: true });
        dispatch(clearAdmin());
        navigate('/admin/login');
    } catch (error) {
        console.error('Error logging out:', error.response?.data?.message || error.message);
    }
};

console.log(defaultProfilePic); // Should log the URL/path to the image
console.log('isAdminAuthenticated:', isAdminAuthenticated);
console.log('Admin:', admin);




  return (
<nav className="admin-navbar">
  <div className="navbar-container">
    <Link to="/admin/dashboard" className="navbar-logo">Admin Side</Link>
    <ul className="navbar-links">
      <li>
        <span>Welcome, {admin?.name || 'Admin'}</span>
      </li>
      {!isAdminAuthenticated ? (
        <>
          <li>
            <Link to="/admin/login">Login</Link>
          </li>
          <li>
            <Link to="/">User side</Link>
          </li>
          {/* Default profile picture for unauthenticated users */}
          <li>
            <div className="profile-icon">
              <img
                src={defaultProfilePic}
                alt="Default Profile"
                className="profile-pic"
              />
            </div>
          </li>
        </>
      ) : (
        <>
          <li>
            <div className="profile-icon">
              {admin?.profilePhoto ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${admin.profilePhoto}`}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <img
                  src={defaultProfilePic}
                  alt="Default Profile"
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

export default AdminNavbar
