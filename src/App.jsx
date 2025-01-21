import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';
import HomePage from './Pages/Home';

const Login = lazy(() => import('./Pages/Login'));
const SignUp = lazy(() => import('./Pages/SignUp'));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path='/user/signup' element={<SignUp />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/home' element={<HomePage/>}/>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
