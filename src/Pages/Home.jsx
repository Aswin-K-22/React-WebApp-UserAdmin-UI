import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Home from '../Components/Home/Home';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../Store/slices/authSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
         dispatch(fetchUser());
      }
      if (!isAuthenticated) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [dispatch, isAuthenticated,navigate ]);

  if (!isAuthenticated && !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;

