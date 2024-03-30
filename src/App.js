import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm  from './components/registration/Login';
import Registerform  from './components/registration/Register';
import HomePage  from './components/user/Home';
import Registerpharma from './components/registration/PharmaProfile';
import RegisterPharmaAdmin from './components/registration/PharmaAdminRegister';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageStaffs from './components/admin/ManageStaff';
import ManageMedicines from './components/admin/ManageMedicines';
import ManageProducts from './components/admin/ManageProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to = "/login"/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Registerform />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/register-admin" element={<RegisterPharmaAdmin/>} />
        <Route path="/register-pharma" element={<Registerpharma/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/manage-staffs" element={<ManageStaffs/>}/>
        <Route path="/manage-users" element={<ManageMedicines/>}/>
        <Route path="/manage-products" element={<ManageProducts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
