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
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.setItem('isLoggedout', 'true');
    showToast('success', 'Logged out Successfully!');
    navigate('/login');
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

  return(
    <div>
      <ToastContainer/>
      <div class='top-div'>
        <div class='logo'>
          <img src={companylogo}/>
        </div>
        <div class="search-bar">
          <form  class="search-form">
            <button type="submit" class="search-button">
              <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <input type="text" class="search-input" placeholder="Search..."/>
          </form>
        </div>
        <div class="user-icons">
          <button className="notif-button">
            <i className="fa fa-bell"></i>
          </button>
          <button className="cart-button">
            <i className="fa fa-shopping-cart"></i>
          </button>
          <div className="user-dropdown">
            <button className="user-button" onClick={() => setShowDropdown(!showDropdown)}>
              <i className="fa fa-user-circle" style={{ border: '2px solid #fff', borderRadius: '50%' }}></i>
              <i className="fa fa-caret-down"></i>
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/user-profile/">User Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class='nav-div'>
        <div class='home-btn'>
          <Link to="/home/"><span class='home-span'>Home</span></Link>
        </div>
        <div class='product-btn'>
          <Link to="/product/"><span class='product-span'>Products</span></Link>
        </div>
        <div class='bmi-btn'>
          <Link to="/bmi/"><span class='bmi-span'>BMI Calculator</span></Link>
        </div>
        <div class='reminder-btn'>
          <Link to="/set-reminder/"><span class='reminder-span'>Set Reminder</span></Link>
        </div>
        <div class='family-btn'>
          <Link to="/family-profile/"><span class='family-span'>Family Profile</span></Link>
        </div>
        <div class='diet-btn'>
          <Link to="/diet-consult/"><span class='diet-span'>Diet Consultation</span></Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
