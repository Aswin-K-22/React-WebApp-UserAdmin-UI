import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from './Store/slices/authSlice';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';

const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
}, [dispatch]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<HomePage/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
