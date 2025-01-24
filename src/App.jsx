


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import AdminLogin from './Pages/AdminLogin';
import AdminDashb from './Pages/AdminDashb';
import EditUserFromAdmin from './Pages/EditUserFromAdmin';

const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));

function App() {

 

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<HomePage/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashb/>} />
            <Route path="/admin/user/edit" element={<EditUserFromAdmin/>} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
