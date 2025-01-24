import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmin } from './Store/middleware/adminFetch';
import { fetchUser } from './Store/slices/authSlice';

// Lazy load all components
const HomePage = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'));
const AdminLogin = lazy(() => import('./Pages/AdminLogin'));
const AdminDashb = lazy(() => import('./Pages/AdminDashb'));
const EditUserFromAdmin = lazy(() => import('./Pages/EditUserFromAdmin'));
const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));

function App() {
  const dispatch = useDispatch();
  const {isAuthenticated } = useSelector((state)=>state.auth);
  const { isAdminAuthenticated } = useSelector((state)=>state.admin);

    useEffect(()=>{
          if (!isAuthenticated) {
            console.log('going to fetch user',isAuthenticated);
            
        dispatch(fetchUser)
          }
          if(!isAdminAuthenticated){
            console.log('going to fetch admin',isAdminAuthenticated);
            
            dispatch(fetchAdmin)
          }
  },[isAdminAuthenticated,isAuthenticated,dispatch])

  return (
    <>
      {/* Add a fallback UI while components are being loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<AdminDashb />} />
            <Route path='/admin/user/edit' element={<EditUserFromAdmin />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
