import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../static/css/Home.css'
import companylogo from '../../static/images/company_logo.png'
import '../../static/vendor/bootstrap/css/bootstrap.min.css'
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../static/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../static/vendor/animate/animate.css'
import '../../static/vendor/css-hamburgers/hamburgers.min.css'
import '../../static/vendor/animsition/css/animsition.min.css'
import '../../static/vendor/select2/select2.min.css'
import '../../static/vendor/daterangepicker/daterangepicker.css'

function HomePage(){

  const navigate = useNavigate();

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
    localStorage.removeItem('userToken');
    localStorage.setItem('isLoggedout', 'true');
    navigate('/login');
  };
  
  return(
    <div id="main-home">
      <ToastContainer/>
      <div id="ecom-head-nav">
        <div id="head-nav-link">
          <img src={companylogo} alt="Company Logo" className="logo-img"/>
          <button class="nav-btn"><Link class="nav-link">Browse</Link></button>
          <button class="nav-btn"><Link class="nav-link">Brands</Link></button>
          <div class="search-container">
            <form action="/search" method="get">
              <input type="text" placeholder="Search for Medications, Products, and Items..." name="search" class="search-input"/>
              <button type="submit" class="search-button">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>
          <button class="upload-pres">
            <i class="fa fa-camera" aria-hidden="true"></i>
            Upload Prescriptions
          </button>
          <button class="nav-btn-notif">
            <i class="fa fa-bell" aria-hidden="true"></i>
            Notifications
          </button>
          <button class="nav-btn-cart">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            Cart
          </button>
          <div className="user-menu">
            <i className="fa fa-user" aria-hidden="true"></i>
            <button className="account-btn">
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link class="drpdwn-link">Profile</Link>
              <Link class="drpdwn-link">Orders</Link>
              <Link class="drpdwn-link">Settings</Link>
              <button class="drpdwn-link" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div id="ecom-body">

      </div>
    </div>
  );
}

export default HomePage;