import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAdmin } from "../Store/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import AdminLoginForm from "../Components/AdminLoginForm/AdminLoginForm";

const AdminLogin = () => {
    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAdminAuthentication = async () => {
            if (!isAdminAuthenticated) {
                await fetchAdmin(dispatch);
            } else {
                navigate('/admin/dashboard');
            }
        };

        checkAdminAuthentication();
    }, [isAdminAuthenticated, navigate]);

    return (
        <div>
            <AdminLoginForm />
        </div>
    );
};

export default AdminLogin;
