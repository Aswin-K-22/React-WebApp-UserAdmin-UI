import { useState } from 'react';
import axios from '../../axios';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser } from '../../Store/slices/authSlice';
import './LoginForm.css';

const LoginForm = () => {


    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        try {
            const response = await axios.post('/user/login', formData);
            dispatch(setUser({
                name: response.data.name,
                token: response.data.token, 
            }));
            alert('Login successful');
            navigate('/'); 
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="login-page">
        <form onSubmit={handleSubmit} className="login-form">
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default LoginForm;
