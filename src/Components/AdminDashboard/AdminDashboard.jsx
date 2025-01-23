import './AdminDashboard.css'; // Import your CSS for styling
import { useState, useEffect } from 'react';
import axios from '../../axios'; // Ensure this is set up for API requests
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]); // Initialize with an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
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

    const handleAddUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = async () => {
        // Frontend Validation
        if (!newUser.name || !newUser.email || !newUser.password) {
            alert('All fields (Name, Email, and Password) are required!');
            return;
        }
    
        try {
            const response = await axios.post('/admin/addUser', newUser);
            
            setUsers([...users, response.data.user]); // Add the new user to the list
            setNewUser({ name: '', email: '', password: '' }); // Clear input fields
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error('Error adding user:', error.response?.data?.message || error.message);
        }
    };
    
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                 await axios.delete(`/admin/user/${id}`); // Replace with your API endpoint 
                    setUsers(users.filter((user) => user._id !== id));

                
                alert('User deleted successfully'); // Show success message
            } catch (error) {
                console.error('Error deleting user:', error.response?.data?.message || error.message);
                alert(`Error deleting user: ${error.response?.data?.message || error.message}`); // Show error message to user
            }
        }
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
                    <input
                        name="name"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleAddUserChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleAddUserChange}
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleAddUserChange}
                    />
                    <button onClick={handleAddUser}>Submit</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
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
