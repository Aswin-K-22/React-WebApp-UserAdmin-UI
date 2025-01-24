import { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import AdminLoginForm from "../Components/AdminLoginForm/AdminLoginForm";
const AdminNavbar = lazy(()=>import("../Components/AdminNavbar/AdminNavbar"))

import Footer from "../Components/Footer/Footer";
import { fetchAdmin } from "../Store/middleware/adminFetch";

const AdminLogin = () => {
    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log('admin login page - rendering');
    
    
    useEffect(() => {
        if (isAdminAuthenticated) {
            
            navigate('/admin/dashboard');
        }else{
             dispatch(fetchAdmin())
        }
        console.log('ADmin login page -useEffect',isAdminAuthenticated);

    }, [isAdminAuthenticated, navigate,dispatch]);
    
 


    return (
        <div>

            <AdminNavbar />
            <AdminLoginForm />
            <Footer />
        </div>
    );
};

export default AdminLogin;
