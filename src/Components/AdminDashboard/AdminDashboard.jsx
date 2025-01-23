import './AdminDashboard.css'; // Import your CSS for styling
import { useState, useEffect } from 'react';
import axios from '../../axios'; // Ensure this is set up for API requests
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';


const AdminDashboard = () => {

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]); // Initialize with an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
   
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Fetch initial user data
    useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchUsers();
}, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!newUser.name.trim()) newErrors.name = 'Name is required.';
        if (!newUser.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) {
            newErrors.email = 'Enter a valid email address.';
        }
        if (!newUser.password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (newUser.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        return newErrors;
    };

    const handleAddUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        setErrors((prev) => ({ ...prev, [e.target.name]: '' })); // Clear error for the field
    };

    const handleAddUser = async () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/admin/addUser', newUser);
            setUsers([...users, response.data.user]);
            setNewUser({ name: '', email: '', password: '' });
            setErrors({});
            setIsModalOpen(false);
            toast.success('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error.response?.data?.message || error.message);
        }
    };
    

    const handleDeleteUser = async (id) => {
        toast.info('Are you sure you want to delete this user?', {
            position: "top-center",
            autoClose: false, // Keep the toast open until user interacts
            closeOnClick: false, // Prevent accidental closure
            closeButton: false, // Hide the default close button
            pauseOnHover: false,
            draggable: false,
            toastId: `confirm-delete-${id}`, // Unique ID for this toast
            render: (
                <div>
                    <p>Are you sure you want to delete this user?</p>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                        <button
                            style={{
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                            onClick={async () => {
                                try {
                                    await axios.delete(`/admin/user/${id}`); // API request
                                    setUsers(users.filter((user) => user._id !== id)); // Update state
                                    toast.dismiss(`confirm-delete-${id}`); // Close the confirmation toast
                                    toast.success('User deleted successfully!', {
                                        position: 'top-center',
                                        autoClose: 3000,
                                    });
                                } catch (error) {
                                    toast.error(`Error deleting user: ${error.response?.data?.message || error.message}`, {
                                        position: 'top-center',
                                    });
                                }
                            }}
                        >
                            Yes
                        </button>
                        <button
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => toast.dismiss(`confirm-delete-${id}`)}
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
        });
    };
    

    const handleEditUser = (user) => {
        navigate('/admin/user/edit', { state: { user } }); // Pass user data to the edit page
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-dashboard">
             {loading ? (
            <p>Loading users...</p>
        ) : (
            <>
            <h1>Admin Dashboard</h1>

            <div className="top-bar">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={() => setIsModalOpen(true)} className="add-user-button">
                    Add New User
                </button>
            </div>

            {isModalOpen && (
                 <div className="modal">
                 <h2>Add New User</h2>
                 <div className="modal-input-container">
                     <label>Name</label>
                     <input
                         name="name"
                         placeholder="Name"
                         value={newUser.name}
                         onChange={handleAddUserChange}
                         className={errors.name ? 'input-error' : ''}
                     />
                     {errors.name && <p className="error-message">{errors.name}</p>}
                 </div>
                 <div className="modal-input-container">
                     <label>Email</label>
                     <input
                         name="email"
                         placeholder="Email"
                         value={newUser.email}
                         onChange={handleAddUserChange}
                         className={errors.email ? 'input-error' : ''}
                     />
                     {errors.email && <p className="error-message">{errors.email}</p>}
                 </div>
                 <div className="modal-input-container">
                     <label>Password</label>
                     <input
                         name="password"
                         placeholder="Password"
                         type="password"
                         value={newUser.password}
                         onChange={handleAddUserChange}
                         className={errors.password ? 'input-error' : ''}
                     />
                     {errors.password && <p className="error-message">{errors.password}</p>}
                 </div>
                 <div className="modal-actions">
                     <button onClick={handleAddUser} className="submit-button">
                         Submit
                     </button>
                     <button onClick={() => setIsModalOpen(false)} className="cancel-button">
                         Cancel
                     </button>
                 </div>
             </div>
         )}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>User</td>
                                <td>
    <div className="button-container">
        <button onClick={() => handleEditUser(user)} className="edit-button">
            Edit
        </button>
        <button
            onClick={() => handleDeleteUser(user._id)}
            className="delete-button"
        >
            Delete
        </button>
    </div>
</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </>
        )}
        </div>
    );
};

export default AdminDashboard;
