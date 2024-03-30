import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../static/css/AdminDashboard.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function AdminProfile(){

  const navigate = useNavigate();

  const [fullHeight, setFullHeight] = useState(window.innerHeight);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const getServerIPAddress = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8000';
    } else {
        return `http://${window.location.hostname}:8000`;
    }
  };

  const API_BASE_URL = getServerIPAddress();

  const showToast = (type, message) => {
    toast[type](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    function handleResize() {
      setFullHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.setItem('isLoggedout', 'true');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return(
    <div class="wrapper d-flex align-items-stretch">
    <ToastContainer/>
			<nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary" onClick={toggleSidebar}>
	          <i class="fa fa-bars"></i>
	          <span class="sr-only">Toggle Menu</span>
	        </button>
        </div>
				<div class="p-4">
		  		<h1><a href="index.html" class="logo">Pharmacy Name <span>Admin Name</span></a></h1>
	        <ul class="list-unstyled components mb-5">
	          <li class="active">
	            <Link to="/admin-dashboard/"><span class="fa fa-home mr-3"></span> Dashboard</Link>
	          </li>
	          <li>
	              <Link to="/manage-staffs/"><span class="fa fa-user mr-3"></span> Manage Users</Link>
	          </li>
	          <li>
              <Link to="/manage-products/"><span class="fa fa-briefcase mr-3"></span> Manage Products</Link>
	          </li>
	          <li>
              <Link to="/manage-medicines/"><span class="fa fa-briefcase mr-3"></span> Manage Medicines</Link>
	          </li>
	          <li>
              <Link to="/admin-profile/"><span class="fa fa-cogs mr-3"></span> User Profile</Link>
	          </li>
            <li>
              <Link to="/login/" onClick={logout}><span class="fa fa-paper-plane mr-3"></span> Logout</Link>
	          </li>
	        </ul>
	      </div>
    	</nav>
      <div id="content" class="p-4 p-md-5 pt-5">
      </div>
		</div>
  );
}

export default AdminProfile;
