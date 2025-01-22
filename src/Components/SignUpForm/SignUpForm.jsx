import { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Store/slices/authSlice';
import './SignUpForm.css'; // Import the CSS file

const SignUpForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await axios.post('/user/signup', formData);
            console.log("response data 'respose.data' = ",response.data);


            dispatch(setUser({
                name: response.data.name,
                token: response.data.token, // Assuming token is returned
            }));
            alert(response.data.message);
            navigate('/');
        } catch (err) {
            console.error('Error in  SignUpForm handleSubmit() catch block' ,err);
            alert(err.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="signup-page">
        <form onSubmit={handleSubmit} className="signup-form">
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default SignUpForm;
