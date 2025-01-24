import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar/AdminNavbar";
import AdminDashboard from "../Components/AdminDashboard/AdminDashboard";
import Footer from "../Components/Footer/Footer";

const AdminDashb = () => {
    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminAuthentication = async () => {
            if (!isAdminAuthenticated) {
               navigate('/admin/login')
            } 
        };

        checkAdminAuthentication();
    }, [isAdminAuthenticated, navigate]);

  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <AdminDashboard />
      <Footer></Footer>
    </div>
  )
}

export default AdminDashb
