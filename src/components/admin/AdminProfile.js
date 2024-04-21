import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../static/css/dashboard-style.css'
import '../../static/css/styles.css'
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

  const [admin, setAdmin] = useState([]);

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

  useEffect(() =>{
    const fetchAdminDetails = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('No user ID found in local storage.');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/autho/get-user/${userId}/`);
        if(response.data.length > 0) {
          const userData = response.data[0];
          setAdmin({
            firstName: userData.first_name,
            middleName: userData.middle_name,
            lastName: userData.last_name,
            email: userData.email,
            phoneNumber: userData.phone_number,
            address: userData.address
          });
        }
      } catch (error) {
        console.error('Failed to fetch admin details: ', error);
      }
    };
    fetchAdminDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission action

    // Retrieve the UUID from local storage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found in local storage.');
      return;
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/autho/update-user/${userId}/`, {
        first_name: admin.firstName,
        middle_name: admin.middleName,
        last_name: admin.lastName,
        email: admin.email,
        phone_number: admin.phoneNumber,
        address: admin.address,
        password: admin.password,
      });

      console.log('Profile updated:', response.data);
      showToast('success', 'Profile updated successfully.');
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast('error', 'Failed to update profile.');
    }
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
      <div id="content" className="p-4 p-md-5 pt-5">
        <h2 className="mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" value={admin.firstName} onChange={(e) => setAdmin({...admin, firstName: e.target.value})} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <input type="text" className="form-control" id="middleName" value={admin.middleName} onChange={(e) => setAdmin({...admin, middleName: e.target.value})} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" value={admin.lastName} onChange={(e) => setAdmin({...admin, lastName: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email address</label>
            <input type="email" className="form-control" id="emailAddress" value={admin.email} onChange={(e) => setAdmin({...admin, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" className="form-control" id="phoneNumber" value={admin.phoneNumber} onChange={(e) => setAdmin({...admin, phoneNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" value={admin.address} onChange={(e) => setAdmin({...admin, address: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter new password" onChange={(e) => setAdmin({...admin, password: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
		</div>
  );
}

export default AdminProfile;
