import { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import './AdminLoginForm.css';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../../Store/slices/adminSlice';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear specific field error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Prevent submission if validation fails
        }

        try {
            const response = await axios.post('/admin/login', formData);
            dispatch(
                setAdmin({
                    name: response.data.name,
                    token: response.data.token,
                })
            );
            toast.success('Admin login successful');
            navigate('/admin/dashboard');
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error('Invalid email or password');
            } else {
                toast.error(err.response?.data?.message || 'Something went wrong');
            }
        }
    };

    return (
        <div className="admin-login-page">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="admin-login-form">
                <h2>Admin Login</h2>

                {/* Email Input */}
                <div className="form-group">
                    <input
                        name="email"
                        placeholder="Admin Email"
                        onChange={handleChange}
                        value={formData.email}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                {/* Password Input */}
                <div className="form-group">
                    <div className="password-container">
                        <input
                            name="password"
                            placeholder="Admin Password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            value={formData.password}
                            className={errors.password ? 'input-error' : ''}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="show-password-button"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <button type="submit">Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLoginForm;
