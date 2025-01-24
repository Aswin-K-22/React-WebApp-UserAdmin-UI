import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar/AdminNavbar";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import Footer from "../Components/Footer/Footer";
import { ToastContainer } from 'react-toastify';

const AdminDashb = () => {
    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      if (!isAdminAuthenticated) {
        navigate('/admin/login')
      }
      console.log('admin dash page' , isAdminAuthenticated);
      
  }, [isAdminAuthenticated, navigate,dispatch]); 

  return (
    <div>
      <ToastContainer/>
      <AdminNavbar></AdminNavbar>
      <AdminDashboard />
      <Footer></Footer>
    </div>
  )
}

export default AdminDashb
