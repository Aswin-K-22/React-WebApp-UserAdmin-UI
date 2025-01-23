


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import HomePage from './Pages/Home';
import Profile from './Pages/Profile';
import AdminLoginForm from './Components/AdminLoginForm/AdminLoginForm';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import EditUserForm from './Components/EditUserForm/EditUserForm';

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
            <Route path="/admin/login" element={<AdminLoginForm />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/user/edit" element={<EditUserForm />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
