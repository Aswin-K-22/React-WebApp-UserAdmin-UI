import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

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
            alert('Login successful');
            localStorage.setItem('token', response.data.token);
            navigate('/user/home'); // Ensure the path starts with "/"
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
