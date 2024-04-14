import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import '../../static/css/AdminDashboard.css'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function AdminDashboard(){

  const navigate = useNavigate();

  const [fullHeight, setFullHeight] = useState(window.innerHeight);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      toast.success('Logged in Successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      localStorage.removeItem('isLoggedIn');
    }
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

  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
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
        <h2 className="mb-4">Dashboard</h2>
        <div className="row">
          {/* Cards for quick stats with updated background colors */}
          <div className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#4e73df", color: "#ffffff" }}>
              <div className="card-body">
                <h5 className="card-title">Total Revenue</h5>
                <p className="card-text">$25,000</p>
                <p className="card-text">Revenue this month.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#1cc88a", color: "#ffffff" }}>
              <div className="card-body">
                <h5 className="card-title">Outstanding Orders</h5>
                <p className="card-text">35</p>
                <p className="card-text">Orders pending delivery.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#36b9cc", color: "#ffffff" }}>
              <div className="card-body">
                <h5 className="card-title">Customer Feedback</h5>
                <p className="card-text">4.5/5</p>
                <p className="card-text">Average customer rating.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sales Overview</h5>
                <div style={{ height: '400px' }}>
                  <Bar data={salesData} options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
