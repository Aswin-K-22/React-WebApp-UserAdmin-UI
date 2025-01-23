import { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './AdminLoginForm.css'; 
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../Store/slices/admin';

const AdminLoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert('Please fill out all fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email');
            return;
        }

        try {
            const response = await axios.post('/admin/login', formData);
            dispatch(setAdmin({
                name: response.data.name,
                token: response.data.token,
            }));
            alert('Admin login successful');
            navigate('/admin/dashboard');
        } catch (err) {
            if (err.response?.status === 401) {
                alert('Invalid email or password');
            } else {
                alert(err.response?.data?.message || 'Something went wrong');
            }
        }
    };

    return (
        <div className="admin-login-page">
            <form onSubmit={handleSubmit} className="admin-login-form">
                <input
                    name="email"
                    placeholder="Admin Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <div className="password-container">
                    <input
                        name="password"
                        placeholder="Admin Password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="show-password-button"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <button type="submit">Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
