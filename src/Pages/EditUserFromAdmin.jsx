import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Components/AdminNavbar/AdminNavbar";
import Footer from "../Components/Footer/Footer";
import EditUserForm from "../Components/EditUserForm/EditUserForm";
const EditUserFromAdmin = () => {
    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    useEffect(() => {
            if (!isAdminAuthenticated) {
                navigate('/admin/login');
            }

    }, [isAdminAuthenticated, navigate]);

  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <EditUserForm></EditUserForm>
      <Footer></Footer>
    </div>
  )
}

export default EditUserFromAdmin
