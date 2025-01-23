import { useState } from 'react';
import './EditUserForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';

const EditUserForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = location.state || {};
    if (!user) {
        navigate('/admin/dashboard');
    }

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        userId: user?._id || '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        let formErrors = { name: '', email: '', password: '' };

        if (!formData.name) {
            formErrors.name = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password || formData.password === '') {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password should be at least 6 characters long';
            isValid = false;
        }

        if (!isValid) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('/admin/editUser', formData);
            console.log(response.data);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="edit-user-form-container">
            <div className="edit-user-form-wrapper">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="edit-user-form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="edit-user-form-error">{errors.name}</div>}
                    </div>
                    <div className="edit-user-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="edit-user-form-error">{errors.email}</div>}
                    </div>
                    <div className="edit-user-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="edit-user-form-error">{errors.password}</div>}
                    </div>
                    <div className="edit-user-form-actions">
                        <button type="submit" className="edit-user-form-submit">Update User</button>
                        <button
                            type="button"
                            className="edit-user-form-cancel"
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;

